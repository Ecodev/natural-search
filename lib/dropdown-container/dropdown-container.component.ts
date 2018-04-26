import {
    ChangeDetectionStrategy,
    Component,
    ComponentRef,
    EmbeddedViewRef,
    OnDestroy,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import { TemplatePortal } from '@angular/cdk/portal/typings/portal';
import { naturalDropDownAnimations } from './dropdown-container-animations';
import { Subject } from 'rxjs/Subject';

export function throwMatDialogContentAlreadyAttachedError() {
    throw Error('Attempting to attach dialog content after content is already attached');
}

@Component({
    selector: 'natural-dropdown-container',
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

    ngOnDestroy() {
        this.closed.complete();
    }

    public close() {
        this.closed.next();
    }

    public attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
        return;
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

    public onAnimationDone() {
        this.animationDone.next();
    }

}
