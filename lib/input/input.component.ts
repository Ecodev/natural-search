import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatRipple } from '@angular/material';
import { NaturalDropdownComponent } from '../dropdown/dropdown.component';
import { TemplatePortal } from '@angular/cdk/portal';
import { ConnectedPositionStrategy, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';

@Component({
    selector: 'natural-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
})
export class NaturalInputComponent implements OnInit, OnDestroy {

    /**
     * https://github.com/angular/material2/blob/master/src/lib/core/ripple/ripple.md
     */
    @ViewChild(MatRipple) ripple: MatRipple;

    @ViewChild('input') input: ElementRef;
    @ViewChild('field') field: ViewContainerRef;
    @ViewChild('dropdown') dropdown: NaturalDropdownComponent;

    @Input() placeholder = 'Rechercher';
    @Input() readonly = false;

    private portal: TemplatePortal<any>;
    private overlayRef: OverlayRef | null = null;

    public formCtrl: FormControl = new FormControl();

    private dropdownOpen;

    constructor(private element: ElementRef, private viewContainerRef: ViewContainerRef, private overlay: Overlay) {
    }

    ngOnInit() {

        this.input.nativeElement.addEventListener('focus', () => {
            this.openDropdown();
        });

        this.input.nativeElement.addEventListener('blur', () => {
            this.closeDropdown();
        });

        this.dropdown.close.subscribe(() => this.destroyMenu());
    }

    private destroyMenu() {
        if (this.overlayRef) {
            // this._resetMenu();
            // this._closeSubscription.unsubscribe();
            this.overlayRef.detach();
            this.dropdown.resetAnimation();

        }
    }

    ngOnDestroy() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
        }

        // this._cleanUpSubscriptions();
    }

    public launchRipple() {
        const rippleRef = this.ripple.launch({
            persistent: true,
            centered: true,
        });

        // Fade out the ripple later.
        rippleRef.fadeOut();
    }

    /** Toggles the menu between the open and closed states. */
    toggledropdown(): void {
        return this.dropdownOpen ? this.closeDropdown() : this.openDropdown();
    }

    /** Opens the dropdown. */
    openDropdown(): void {
        if (this.dropdownOpen) {
            return;
        }

        this.createOverlay().attach(this.portal);

        // this._closeSubscription = this._dropdownClosingActions().subscribe(() => this.closeDropdown());
        // this._initdropdown();
        this.dropdown.startAnimation();

    }

    /** Closes the dropdown. */
    closeDropdown(): void {
        this.dropdown.close.emit();
    }

    private createOverlay(): OverlayRef {

        if (!this.overlayRef) {
            this.portal = new TemplatePortal(this.dropdown.templateRef, this.viewContainerRef);
            const config = this.getOverlayConfig();
            // this._subscribeToPositions(config.positionStrategy as ConnectedPositionStrategy);
            this.overlayRef = this.overlay.create(config);
        }

        return this.overlayRef;
    }

    /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     * @returns OverlayConfig
     */
    private getOverlayConfig(): OverlayConfig {
        return new OverlayConfig({
            positionStrategy: this.getPosition(),
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
            direction: 'ltr',
        });
    }

    private getPosition(): ConnectedPositionStrategy {

        return this.overlay.position()
                   .connectedTo(this.element,
                       {
                           originX: 'start',
                           originY: 'bottom',
                       },
                       {
                           overlayX: 'start',
                           overlayY: 'top',
                       })
                   .withOffsetY(10);

    }

}
