import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { naturalDropDownAnimations } from './dropdown-animations';
import { AnimationEvent } from '@angular/animations';

@Component({
    selector: 'natural-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
    animations: [
        naturalDropDownAnimations.transformMenu,
        naturalDropDownAnimations.fadeInItems,
    ],
})
export class NaturalDropdownComponent implements OnInit {

    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
    @Output() close = new EventEmitter<void | 'click' | 'keydown'>();

    public panelAnimationState: 'void' | 'enter-start' | 'enter' = 'void';

    constructor() {
    }

    ngOnInit() {
    }

    /** Starts the enter animation. */
    startAnimation() {
        this.panelAnimationState = 'enter-start';
    }

    /** Resets the panel animation to its initial state. */
    resetAnimation() {
        this.panelAnimationState = 'void';
    }

    /** Callback that is invoked when the panel animation completes. */
    onAnimationDone(event: AnimationEvent) {
        // After the initial expansion is done, trigger the second phase of the enter animation.
        if (event.toState === 'enter-start') {
            this.panelAnimationState = 'enter';
        }
    }

}
