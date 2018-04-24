import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EmbeddedViewRef,
    EventEmitter,
    Inject,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { DOCUMENT } from '@angular/common';
import { TemplatePortal } from '@angular/cdk/portal/typings/portal';
import { naturalDropDownAnimations } from './dropdown-container-animations';
import { Subject } from 'rxjs/Subject';

export function throwMatDialogContentAlreadyAttachedError() {
    throw Error('Attempting to attach dialog content after content is already attached');
}

@Component({
    moduleId: module.id,
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
export class NaturalDropdownContainerComponent extends BasePortalOutlet implements OnInit, AfterContentInit, OnDestroy {

    @ViewChild(CdkPortalOutlet) _portalOutlet: CdkPortalOutlet;
    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
    @Output() readonly closed: EventEmitter<void> = new EventEmitter<void>();

    /** Current state of the panel animation. */
    public panelAnimationState: 'void' | 'enter' = 'void';

    /** Emits whenever an animation on the menu completes. */
    private animationDone = new Subject<void>();

    constructor(
        private _elementRef: ElementRef,
        private _focusTrapFactory: FocusTrapFactory,
        private _changeDetectorRef: ChangeDetectorRef,
        @Optional() @Inject(DOCUMENT) private _document: any) {
        super();
    }

    ngOnInit() {
    }

    ngAfterContentInit() {
    }

    ngOnDestroy() {
        this.closed.complete();
    }

    public attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
        return;
    }

    public attachComponentPortal<T>(portal: ComponentPortal<T>) {
        if (this._portalOutlet.hasAttached()) {
            throwMatDialogContentAlreadyAttachedError();
        }

        return this._portalOutlet.attachComponentPortal(portal);
    }

    /** Starts the enter animation. */
    public startAnimation() {
        this.panelAnimationState = 'enter';
    }

    /** Resets the panel animation to its initial state. */
    public resetAnimation() {
        this.panelAnimationState = 'void';
    }

    /** Callback that is invoked when the panel animation completes. */
    public onAnimationDone() {
        this.animationDone.next();
    }

}
