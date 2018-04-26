import { ComponentRef, ElementRef, Injectable, InjectionToken, Injector } from '@angular/core';
import { ConnectedPositionStrategy, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { NaturalDropdownContainerComponent } from './dropdown-container.component';
import { NaturalDropdownRef } from './dropdown-ref';

export const NATURAL_DROPDOWN_DATA = new InjectionToken<any>('NaturalDropdownData');

@Injectable()
export class NaturalDropdownService {

    constructor(private overlay: Overlay, private injector: Injector) {
    }

    public open(component, connectedElement: ElementRef, customInjectorTokens: WeakMap<any, any>): NaturalDropdownRef {

        // Container
        const overlayRef = this.overlay.create(this.getOverlayConfig(connectedElement));
        const containerPortal = new ComponentPortal(NaturalDropdownContainerComponent);
        const containerRef: ComponentRef<NaturalDropdownContainerComponent> = overlayRef.attach(containerPortal);

        const dropdownContainer = containerRef.instance;
        const dropdownRef = new NaturalDropdownRef(overlayRef, dropdownContainer);

        // Customize injector to allow data and dropdown reference injection in component
        customInjectorTokens.set(NaturalDropdownRef, dropdownRef);
        const injector = new PortalInjector(this.injector, customInjectorTokens);

        // Content (type component given in configuration)
        const componentPortal = new ComponentPortal(component, undefined, injector);
        const contentRef = containerRef.instance.attachComponentPortal<any>(componentPortal);
        dropdownRef.componentInstance = contentRef.instance;

        // Init type component value,
        contentRef.instance.initValue(customInjectorTokens.get(NATURAL_DROPDOWN_DATA).value);

        // Start animation that shows menu
        dropdownContainer.startAnimation();

        // When click on backdrop, validate result.. ?
        const backdropSub = overlayRef.backdropClick().subscribe(() => {
            dropdownContainer.close();
            dropdownRef.close(dropdownRef.componentInstance.getValue());
            backdropSub.unsubscribe();
        });

        return dropdownRef;
    }

    /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     * @returns OverlayConfig
     */
    private getOverlayConfig(element): OverlayConfig {
        return new OverlayConfig({
            positionStrategy: this.getPosition(element),
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
        });
    }

    private getPosition(element): ConnectedPositionStrategy {

        return this.overlay.position()
                   .connectedTo(element,
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