import {
    AfterContentInit,
    Component,
    ComponentRef,
    ElementRef,
    InjectionToken,
    Injector,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { MatRipple } from '@angular/material';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ConnectedPositionStrategy, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { merge } from 'rxjs/observable/merge';
import { Subscription } from 'rxjs/Subscription';
import { FormControl } from '@angular/forms';
import { NaturalDropdownContainerComponent } from '../dropdown-container/dropdown-container.component';

export const MAT_INPUT_CONFIGURATION = new InjectionToken<any>('NaturalSearchConfiguration');

@Component({
    selector: 'natural-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
})
export class NaturalInputComponent implements OnInit, OnDestroy, AfterContentInit {

    @Input() placeholder = 'Rechercher';
    @Input() readonly = false;
    @Input() configuration: any;

    @ViewChild(MatRipple) ripple: MatRipple;
    @ViewChild('input') input: ElementRef;
    @ViewChild('field') field: ViewContainerRef;

    public formCtrl: FormControl = new FormControl();
    public overlayRef: OverlayRef;
    private dropdown;
    private closeSubscription = Subscription.EMPTY;

    constructor(private element: ElementRef,
                private viewContainerRef: ViewContainerRef,
                private overlay: Overlay,
                private injector: Injector) {
    }

    ngOnInit() {
        this.input.nativeElement.addEventListener('focus', () => {
            this.open();
        });
    }

    ngOnDestroy() {
    }

    ngAfterContentInit() {
    }

    private destroyMenu() {
        this.closeSubscription.unsubscribe();
        this.overlayRef.detach();
        this.dropdown.resetAnimation();
    }

    public launchRipple() {
        const rippleRef = this.ripple.launch({
            persistent: true,
            centered: true,
        });

        // Fade out the ripple later.
        rippleRef.fadeOut();
    }

    /** Opens the dropdown. */
    public open(): void {

        this.overlayRef = this.overlay.create(this.getOverlayConfig());
        const containerPortal = new ComponentPortal(NaturalDropdownContainerComponent);
        const containerRef: ComponentRef<NaturalDropdownContainerComponent> = this.overlayRef.attach(containerPortal);

        const injector = this.createInjector();
        const componentPortal = new ComponentPortal(this.configuration.component, undefined, injector);
        containerRef.instance.attachComponentPortal<any>(componentPortal);

        this.dropdown = containerRef.instance;
        this.dropdown.startAnimation();
        this.dropdown.closed.subscribe(() => this.destroyMenu());

        const backdrop = this.overlayRef.backdropClick();
        const detachments = this.overlayRef.detachments();

        this.closeSubscription = merge(backdrop, detachments).subscribe(() => this.closeMenu());
    }

    private createInjector() {
        const injectionTokens = new WeakMap();
        injectionTokens.set(FormControl, this.formCtrl);
        injectionTokens.set(MAT_INPUT_CONFIGURATION, this.configuration);
        return new PortalInjector(this.injector, injectionTokens);
    }

    /** Closes the menu. */
    closeMenu(): void {
        this.dropdown.closed.emit();
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
