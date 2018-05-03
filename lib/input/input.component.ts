import {
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
import { ErrorStateMatcher, MatRipple } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { NaturalSearchConfiguration, NaturalSearchItemConfiguration } from '../types/Configuration';
import { ConfigurationSelectorComponent } from '../dropdown-components/configuration-selector/configuration-selector.component';
import { NATURAL_DROPDOWN_DATA, NaturalDropdownService } from '../dropdown-container/dropdown.service';
import { NaturalSearchDropdownResult, NaturalSearchValue } from '../types/Values';
import { InputOutput } from '../classes/input-output';
import { NaturalDropdownRef } from '../dropdown-container/dropdown-ref';
import { ComponentType, PortalInjector } from '@angular/cdk/portal';
import { NaturalSearchDropdownComponent } from '../types/DropdownComponent';

// Required to check invalid fields when initializing natural-search
export class AlwaysErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control && control.invalid;
    }
}

// bellow comment fix this : https://github.com/angular/angular/issues/18867
// @dynamic
@Component({
    selector: 'natural-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
})
export class NaturalInputComponent implements OnInit, OnChanges, OnDestroy {

    @Input() placeholder = 'Rechercher';
    @Input() configurations: NaturalSearchConfiguration;
    @Input() configuration: NaturalSearchItemConfiguration;
    @Input() value: NaturalSearchValue;
    @Output() valueChange = new EventEmitter<NaturalSearchValue>();
    @Output() cleared = new EventEmitter<NaturalInputComponent>();

    @ViewChild(MatRipple) ripple: MatRipple;
    @ViewChild('input') input: ElementRef;

    public formCtrl: FormControl = new FormControl();
    private dropdownRef: NaturalDropdownRef;

    private dropdownComponentRef: ComponentRef<NaturalSearchDropdownComponent>;
    public errorMatcher = new AlwaysErrorStateMatcher();

    public minlength = 5;
    public length = this.minlength;

    public static isComponentValid(component: NaturalSearchDropdownComponent): ValidatorFn {
        return (): { [key: string]: boolean } => {

            if (!component.isValid()) {
                return {component: true};
            }

            return null;
        };
    }

    constructor(private element: ElementRef,
                private dropdown: NaturalDropdownService,
                private injector: Injector,
                private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngOnDestroy() {
    }

    ngOnInit() {

        this.input.nativeElement.addEventListener('focus', () => {
            this.openDropdown();
        });

        this.input.nativeElement.addEventListener('keyup', () => {
            if (!this.dropdownRef) {
                return;
            }

            if (this.formCtrl.value !== '') {
                this.dropdownRef.close();
            }
        });

        const placeholderSize = (this.configuration ? this.configuration.display.length : this.placeholder.length) * 0.66;
        this.length = Math.max(this.minlength, Math.ceil(placeholderSize));
    }

    ngOnChanges(changes: SimpleChanges) {

        if (this.configurations && this.value) {

            this.configuration = InputOutput.getConfigurationFromValue(this.configurations, this.value);

            // If has configuration, means we need a component from external config
            // If hasn't a configuration, that means we are in global search mode
            if (this.configuration && this.configuration.component) {

                // Always destroy and recreate component
                // Todo : test if configuration has changed, if not re-use the component
                if (this.dropdownComponentRef) {
                    this.dropdownComponentRef.destroy();
                }

                this.dropdownComponentRef = this.createComponent<NaturalSearchDropdownComponent>(this.configuration.component);
                const dropdownComponent = this.dropdownComponentRef.instance;
                dropdownComponent.init(this.value.value, this.configuration.configuration);
                this.formCtrl.setValidators([NaturalInputComponent.isComponentValid(dropdownComponent)]);
                this.formCtrl.setValue(dropdownComponent.getRenderedValue());

            } else if (this.configuration && this.configuration.flag) {
                this.formCtrl.setValue('');

            } else {
                this.formCtrl.setValue(this.value.value);
            }
        }
    }

    public search() {

        if (!this.formCtrl.value) {
            return;
        }

        if (this.configuration && this.configuration.component) {
            return;
        }

        this.valueChange.emit({
            attribute: this.configuration ? this.configuration.attribute : 'search',
            value: this.formCtrl.value,
        });

    }

    private createComponent<C>(component: ComponentType<C>): ComponentRef<C> {
        const injector = new PortalInjector(this.injector, this.createInjectorTokens());
        return this.componentFactoryResolver.resolveComponentFactory(component).create(injector);
    }

    public createInjectorTokens(data = null): WeakMap<any, any> {

        // Customize injector to allow data and dropdown reference injection in component
        const injectionTokens = new WeakMap();
        injectionTokens.set(NaturalDropdownRef, null);
        injectionTokens.set(NATURAL_DROPDOWN_DATA, data);

        return injectionTokens;
    }

    public clear() {
        this.configuration = null;
        this.value = null;
        this.formCtrl.setValue(null);
        this.cleared.emit(this);
    }

    public launchRipple() {
        const rippleRef = this.ripple.launch({
            persistent: true,
            centered: true,
        });

        rippleRef.fadeOut();
    }

    public openDropdown() {
        if (this.dropdownRef) {
            // Prevent to open multiple dropdowns.
            // Happens as we open on "focus", and alt+tab re-activate focus on an element that already had
            // focus when leaving window with another alt+tab
            return;
        }

        this.launchRipple();

        if (this.configuration) {

            // If a configuration is selected, open specific component dropdown
            this.openTypeDropdown();

        } else if (!this.configuration && !this.formCtrl.value) {

            // If there is no configuration and no string typed, show panel to select the configuration
            this.openConfigurationsDropdown();
        }
    }

    public openConfigurationsDropdown() {

        const data = {
            configurations: this.configurations,
        };

        const injectorTokens = this.createInjectorTokens(data);

        this.dropdownRef = this.dropdown.open(ConfigurationSelectorComponent, this.element, injectorTokens);
        this.dropdownRef.closed.subscribe((result: NaturalSearchDropdownResult) => {
            this.dropdownRef = null;
            if (result !== undefined) {
                if (result.configuration) {
                    this.setConfiguration(result.configuration);
                } else if (result.value) {
                    this.setValue(result);
                }

            }
        });

    }

    public openTypeDropdown(): void {

        if (this.configuration && this.configuration.component) {

            const data = {
                configuration: this.configuration,
                value: this.value ? this.value.value : null,
            };

            const injectorTokens = this.createInjectorTokens(data);
            this.dropdownRef = this.dropdown.open(this.configuration.component, this.element, injectorTokens);
            this.dropdownRef.closed.subscribe((result: NaturalSearchDropdownResult) => {
                this.dropdownRef = null;
                if (result !== undefined) {
                    this.setValue(result);
                }
            });

        }

    }

    public setConfiguration(config) {
        this.configuration = config;

        if (config.component) {
            this.openTypeDropdown();

        } else if (config.flag) {
            this.setValue({
                value: config.flag,
                rendered: null,
            });

        } else {
            this.input.nativeElement.focus();
        }
    }

    public setValue(result) {
        this.formCtrl.setValue(result.rendered);
        this.valueChange.emit({
            attribute: this.configuration.attribute,
            value: result.value,
        });
    }

}
