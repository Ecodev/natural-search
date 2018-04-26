import {
    AfterContentInit,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EventEmitter,
    Injector,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { MatRipple } from '@angular/material';
import { FormControl } from '@angular/forms';
import { NaturalSearchConfiguration, NaturalSearchItemConfiguration } from '../types/Configuration';
import { ConfigurationSelectorComponent } from '../dropdown-components/configuration-selector/configuration-selector.component';
import { NATURAL_DROPDOWN_DATA, NaturalDropdownService } from '../dropdown-container/dropdown.service';
import { NaturalSearchValue } from '../types/Values';
import { InputOutput } from '../classes/input-output';
import { NaturalDropdownRef } from '../dropdown-container/dropdown-ref';
import { ComponentType, PortalInjector } from '@angular/cdk/portal';
import { NaturalSearchDropdownComponent } from '../types/DropdownComponent';

@Component({
    selector: 'natural-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
})
export class NaturalInputComponent implements OnInit, OnChanges, OnDestroy, AfterContentInit {

    @Input() placeholder = 'Rechercher';
    @Input() readonly = false;
    @Input() configurations: NaturalSearchConfiguration;
    @Input() configuration: NaturalSearchItemConfiguration;
    @Input() value: NaturalSearchValue;
    @Output() valueChanges = new EventEmitter<NaturalSearchValue>();
    @Output() cleared = new EventEmitter<NaturalInputComponent>();

    @ViewChild(MatRipple) ripple: MatRipple;
    @ViewChild('input') input: ElementRef;

    public formCtrl: FormControl = new FormControl();
    private dropdownRef: NaturalDropdownRef;

    private dropdownComponentRef: ComponentRef<NaturalSearchDropdownComponent>;

    constructor(private element: ElementRef,
                private dropdown: NaturalDropdownService,
                private injector: Injector,
                private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
        this.input.nativeElement.addEventListener('focus', () => {
            this.launchRipple();
            if (this.configuration) {
                this.openTypeDropdown();
            } else {
                this.openConfigurationsDropdown();
            }
        });
    }

    ngOnChanges(changes: SimpleChanges) {

        if (this.configurations && this.value) {

            this.configuration = InputOutput.getConfigurationFromValue(this.configurations, this.value);
            if (this.configuration) {
                // Always destroy and recreate component
                // Todo : test if configuration has changed, if not re-use the component
                if (this.dropdownComponentRef) {
                    this.dropdownComponentRef.destroy();
                }

                this.dropdownComponentRef = this.createComponent<NaturalSearchDropdownComponent>(this.configuration.component);
                const dropdownComponent = this.dropdownComponentRef.instance;
                dropdownComponent.initValue(this.value.value);
                this.formCtrl.setValue(dropdownComponent.getRenderedValue());
            }
        }
    }

    private createComponent<C>(component: ComponentType<C>): ComponentRef<C> {
        const injector = new PortalInjector(this.injector, this.createInjectorTokens());
        return this.componentFactoryResolver.resolveComponentFactory(component).create(injector);
    }

    public createInjectorTokens(data = null): WeakMap<any, any> {

        // Customize injector to allow data and dropdown reference injection in component
        const injectionTokens = new WeakMap();
        injectionTokens.set(NaturalDropdownRef, null);
        injectionTokens.set(FormControl, this.formCtrl);
        injectionTokens.set(NATURAL_DROPDOWN_DATA, data);

        return injectionTokens;
    }

    ngOnDestroy() {
    }

    ngAfterContentInit() {
    }

    public clear() {
        this.configuration = null;
        this.value = null;
        this.formCtrl.setValue('');
        this.cleared.emit(this);
    }

    public launchRipple() {
        const rippleRef = this.ripple.launch({
            persistent: true,
            centered: true,
        });

        rippleRef.fadeOut();
    }

    public openConfigurationsDropdown() {

        const data = {
            configurations: this.configurations,
        };

        const injectorTokens = this.createInjectorTokens(data);

        this.dropdown.open(ConfigurationSelectorComponent, this.element, injectorTokens).closed.subscribe(config => {
            if (config) {
                this.configuration = config;
                this.openTypeDropdown();
            }
        });

    }

    public openTypeDropdown(): void {

        const data = {
            configuration: this.configuration,
            value: this.formCtrl.value,
        };

        const injectorTokens = this.createInjectorTokens(data);

        this.dropdownRef = this.dropdown.open(this.configuration.component, this.element, injectorTokens);
        this.dropdownRef.closed.subscribe((result: NaturalSearchValue['value']) => {
            this.valueChanges.emit({
                attribute: this.configuration.attribute,
                value: result,
            });
        });

    }

}
