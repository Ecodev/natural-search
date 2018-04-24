import {
    AfterContentInit,
    Component,
    ComponentRef,
    ElementRef,
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
import { NaturalSearchConfiguration, NaturalSearchItemConfiguration } from '../interfaces/Configuration';
import { ConfigurationSelectorComponent } from '../dropdown-components/configuration-selector/configuration-selector.component';
import { NATURAL_SEARCH_CONFIGURATION, NATURAL_SEARCH_CONFIGURATIONS } from '../dropdown-container/dropdown-ref';

@Component({
    selector: 'natural-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
})
export class NaturalInputComponent implements OnInit, OnDestroy, AfterContentInit {

    @Input() placeholder = 'Rechercher';
    @Input() readonly = false;
    @Input() configurations: NaturalSearchConfiguration;

    public configuration: NaturalSearchItemConfiguration;

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
            if (this.configuration) {
                this.openTypeDropdown();
            } else {
                this.openConfigurationsDropdown();
            }
        });

        // this.formCtrl.valueChanges.subscribe((val) => {
        //     console.log('new val', val);
        //     if (val) {
        //         this.closeMenu();
        //     }
        // });
    }

    ngOnDestroy() {
    }

    ngAfterContentInit() {
    }

    public clear() {
        this.configuration = null;
    }

    private destroyMenu(dropdown) {
        this.closeSubscription.unsubscribe();
        this.overlayRef.detach();
        dropdown.resetAnimation();
    }

    public launchRipple() {
        const rippleRef = this.ripple.launch({
            persistent: true,
            centered: true,
        });

        // Fade out the ripple later.
        rippleRef.fadeOut();
    }

    public openConfigurationsDropdown(): void {

        const dropdown = this.openDropdown(ConfigurationSelectorComponent);
        dropdown.closed.subscribe(config => {
            console.log('config', config);
            this.destroyMenu(dropdown);
            if (config) {
                this.configuration = config;
                this.openTypeDropdown();
            }
        });

    }

    /** Opens the dropdown. */
    public openTypeDropdown(): void {

        const dropdown = this.openDropdown(this.configuration.component);
        dropdown.closed.subscribe(result => {
            this.destroyMenu(dropdown);
            console.log('result', result);
        });

    }

    public openDropdown(component) {

        this.overlayRef = this.overlay.create(this.getOverlayConfig());
        const containerPortal = new ComponentPortal(NaturalDropdownContainerComponent);
        const containerRef: ComponentRef<NaturalDropdownContainerComponent> = this.overlayRef.attach(containerPortal);

        const injector = this.createInjector(containerRef.instance);
        const componentPortal = new ComponentPortal(component, undefined, injector);
        containerRef.instance.attachComponentPortal<any>(componentPortal);

        const dropdown = containerRef.instance;
        dropdown.startAnimation();

        const backdrop = this.overlayRef.backdropClick();
        const detachments = this.overlayRef.detachments();
        this.closeSubscription = merge(backdrop, detachments).subscribe(() => dropdown.closed.emit());

        return dropdown;
    }

    private createInjector(containerRef: NaturalDropdownContainerComponent) {
        const injectionTokens = new WeakMap();
        injectionTokens.set(FormControl, this.formCtrl)
                       .set(NaturalDropdownContainerComponent, containerRef)
                       .set(NATURAL_SEARCH_CONFIGURATION, this.configuration)
                       .set(NATURAL_SEARCH_CONFIGURATIONS, this.configurations);
        return new PortalInjector(this.injector, injectionTokens);
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
