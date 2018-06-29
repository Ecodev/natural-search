import {
    ChangeDetectionStrategy,
    Component,
    ComponentRef,
    ElementRef,
    EmbeddedViewRef,
    OnDestroy,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import { TemplatePortal } from '@angular/cdk/portal/typings/portal';
import { naturalDropDownAnimations } from './dropdown-container-animations';
import { Subject } from 'rxjs';
import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { AnimationEvent } from '@angular/animations';

export function throwMatDialogContentAlreadyAttachedError() {
    throw Error('Attempting to attach dialog content after content is already attached');
}

@Component({
    templateUrl: './dropdown-container.component.html',
    styleUrls: ['./dropdown-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
    animations: [
        naturalDropDownAnimations.transformMenu,
        naturalDropDownAnimations.fadeInItems,
    ],
})
export class NaturalDropdownContainerComponent extends BasePortalOutlet implements OnDestroy {

    @ViewChild(CdkPortalOutlet) portalOutlet: CdkPortalOutlet;
    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

    public readonly closed = new Subject();

    /** Current state of the panel animation. */
    public panelAnimationState: 'void' | 'enter' = 'void';

    /** Emits whenever an animation on the menu completes. */
    private animationDone = new Subject<void>();

    private focusTrap: FocusTrap;
    private elementFocusedBeforeDialogWasOpened: HTMLElement | null = null;

    constructor(private elementRef: ElementRef, private focusTrapFactory: FocusTrapFactory) {

        super();
    }

    ngOnDestroy() {
        this.closed.complete();
    }

    public close() {
        this.closed.next();
    }

    public attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
        return this.portalOutlet.attachTemplatePortal(portal);
    }

    public attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
        if (this.portalOutlet.hasAttached()) {
            throwMatDialogContentAlreadyAttachedError();
        }

        return this.portalOutlet.attachComponentPortal(portal);
    }

    public startAnimation() {
        this.panelAnimationState = 'enter';
    }

    public onAnimationDone(event: AnimationEvent) {
        if (event.toState === 'enter') {
            this.trapFocus();
        } else if (event.toState === 'exit') {
            this.restoreFocus();
        }

        this.animationDone.next();
    }

    private trapFocus() {
        if (!this.focusTrap) {
            this.focusTrap = this.focusTrapFactory.create(this.elementRef.nativeElement);
        }

        this.focusTrap.focusInitialElementWhenReady();
    }

    /** Restores focus to the element that was focused before the dialog opened. */
    private restoreFocus() {
        const toFocus = this.elementFocusedBeforeDialogWasOpened;

        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (toFocus && typeof toFocus.focus === 'function') {
            toFocus.focus();
        }

        if (this.focusTrap) {
            this.focusTrap.destroy();
        }
    }

}
