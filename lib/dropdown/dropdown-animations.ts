import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

/**
 * Animations used by the mat-menu component.
 * Animation duration and timing values are based on:
 * https://material.io/guidelines/components/menus.html#menus-usage
 */
export const naturalDropDownAnimations: {
    readonly transformMenu: AnimationTriggerMetadata;
    readonly fadeInItems: AnimationTriggerMetadata;
} = {
    /**
     * This animation controls the menu panel's entry and exit from the page.
     *
     * When the menu panel is added to the DOM, it scales in and fades in its border.
     *
     * When the menu panel is removed from the DOM, it simply fades out after a brief
     * delay to display the ripple.
     */
    transformMenu: trigger('transformMenu', [
        // TODO(kara): switch to :enter and :leave once Mobile Safari is sorted out.
        state('void', style({
            opacity: 0,
            // This starts off from 0.01, instead of 0, because there's an issue in the Angular animations
            // as of 4.2, which causes the animation to be skipped if it starts from 0.
            transform: 'scale(0.01, 0.01)',
        })),
        state('enter-start', style({
            opacity: 1,
            transform: 'scale(1, 0.5)',
        })),
        state('enter', style({
            transform: 'scale(1, 1)',
        })),
        transition('void => enter-start', animate('100ms linear')),
        transition('enter-start => enter', animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
        transition('* => void', animate('150ms 50ms linear', style({opacity: 0}))),
    ]),

    /**
     * This animation fades in the background color and content of the menu panel
     * after its containing element is scaled in.
     */
    fadeInItems: trigger('fadeInItems', [
        state('showing', style({opacity: 1})),
        transition('void => *', [
            style({opacity: 0}),
            animate('400ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)'),
        ]),
    ]),
};
