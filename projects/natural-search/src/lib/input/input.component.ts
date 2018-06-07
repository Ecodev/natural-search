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
import {
    DropdownConfiguration,
    FlagConfiguration,
    ItemConfiguration,
    NaturalSearchConfiguration,
} from '../types/Configuration';
import { ConfigurationSelectorComponent } from '../dropdown-components/configuration-selector/configuration-selector.component';
import { NATURAL_DROPDOWN_DATA, NaturalDropdownService } from '../dropdown-container/dropdown.service';
import { DropdownResult, Selection } from '../types/Values';
import { getConfigurationFromSelection } from '../classes/utils';
import { NaturalDropdownRef } from '../dropdown-container/dropdown-ref';
import { PortalInjector } from '@angular/cdk/portal';
import { DropdownComponent } from '../types/DropdownComponent';
import { FilterConditionField } from '../classes/graphql-doctrine.types';

// Required to check invalid fields when initializing natural-search
export class AlwaysErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control && control.invalid;
    }
}

function isComponentValid(component: DropdownComponent): ValidatorFn {
    return (): { [key: string]: boolean } => {

        if (!component.isValid()) {
            return {component: true};
        }

        return null;
    };
}

@Component({
    selector: 'natural-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
})
export class NaturalInputComponent implements OnInit, OnChanges, OnDestroy {

    @Input() placeholder = 'Rechercher';
    @Input() configurations: NaturalSearchConfiguration;
    @Input() configuration: ItemConfiguration;
    @Input() searchFieldName = 'search';
    @Input() selection: Selection;
    @Output() selectionChange = new EventEmitter<Selection>();
    @Output() cleared = new EventEmitter<NaturalInputComponent>();

    @ViewChild(MatRipple) ripple: MatRipple;
    @ViewChild('input') input: ElementRef;

    public formCtrl: FormControl = new FormControl();
    private dropdownRef: NaturalDropdownRef;

    private dropdownComponentRef: ComponentRef<DropdownComponent>;
    public errorMatcher = new AlwaysErrorStateMatcher();

    public minlength = 5;
    public length = this.minlength;

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

        if (!this.configurations && this.selection) {
            setTimeout(() => this.clear());

        } else if (this.configurations && this.selection) {

            this.configuration = getConfigurationFromSelection(this.configurations, this.selection);

            // If has configuration, means we need a component from external config
            // If hasn't a configuration, that means we are in global search mode
            if (this.isDropdown()) {
                const dropdownComponent = this.createComponent(this.configuration as DropdownConfiguration);

                this.formCtrl.setValidators([isComponentValid(dropdownComponent)]);
                this.formCtrl.setValue(dropdownComponent.getRenderedValue());

            } else if (this.isFlag()) {
                this.formCtrl.setValue('');

            } else if (this.configuration || this.selection.field === this.searchFieldName) {
                if (this.selection) {
                    this.formCtrl.setValue(this.selection.condition.like.value);
                }

            } else {

                // If component is invalid (no config and not a global search), clear from result and destroy component
                setTimeout(() => this.clear());
            }

        }
    }

    public search() {

        if (!this.formCtrl.value) {
            return;
        }

        if (this.isDropdown()) {
            return;
        }

        this.selectionChange.emit({
            field: this.configuration ? this.configuration.field : this.searchFieldName,
            condition: {like: {value: this.formCtrl.value}},
        });

    }

    private createComponent(configuration: DropdownConfiguration): DropdownComponent {
        // Always destroy and recreate component
        // Todo : test if configuration has changed, if not re-use the component
        if (this.dropdownComponentRef) {
            this.dropdownComponentRef.destroy();
        }

        const injector = new PortalInjector(this.injector, this.createInjectorTokens());
        const factory = this.componentFactoryResolver.resolveComponentFactory<DropdownComponent>(configuration.component);
        this.dropdownComponentRef = factory.create(injector);

        const dropdownComponent = this.dropdownComponentRef.instance;
        dropdownComponent.init(this.selection.condition as FilterConditionField, configuration.configuration);

        return dropdownComponent;
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
        this.selection = null;
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

        // If there is no configuration and no string typed, show panel to select the configuration
        if (!this.configuration && !this.formCtrl.value) {
            this.openConfigurationsDropdown();
        } else {
            // If a configuration is selected, open specific component dropdown
            this.openTypeDropdown();
        }
    }

    public openConfigurationsDropdown() {

        const data = {
            configurations: this.configurations,
        };

        const injectorTokens = this.createInjectorTokens(data);

        this.dropdownRef = this.dropdown.open(ConfigurationSelectorComponent, this.element, injectorTokens);
        this.dropdownRef.closed.subscribe((result: DropdownResult) => {
            this.dropdownRef = null;
            if (result !== undefined) {
                if (result.configuration) {
                    this.setConfiguration(result.configuration);
                } else if (result.condition) {
                    this.setValue(result);
                }

            }
        });

    }

    public openTypeDropdown(): void {

        if (!this.isDropdown()) {
            return;
        }

        const data = {
            configuration: this.configuration,
            value: this.selection ? this.selection.condition : null,
        };

        const injectorTokens = this.createInjectorTokens(data);
        const component = (this.configuration as DropdownConfiguration).component;
        this.dropdownRef = this.dropdown.open(component, this.element, injectorTokens);
        this.dropdownRef.closed.subscribe((result: DropdownResult) => {
            this.dropdownRef = null;
            if (result !== undefined) {
                this.setValue(result);
            }
        });
    }

    public isDropdown(): boolean {
        return !!(this.configuration && (this.configuration as DropdownConfiguration).component);
    }

    private isFlag(): boolean {
        return !!(this.configuration && (this.configuration as FlagConfiguration).condition);
    }

    public setConfiguration(config: ItemConfiguration) {
        this.configuration = config;

        if (this.isDropdown()) {
            this.openTypeDropdown();

        } else if (this.isFlag()) {
            this.setValue({
                condition: (config as FlagConfiguration).condition,
                rendered: null,
            });

        } else {
            this.input.nativeElement.focus();
        }
    }

    public setValue(result: DropdownResult) {
        this.formCtrl.setValue(result.rendered);
        this.selectionChange.emit({
            field: this.configuration.field,
            condition: result.condition,
        });
    }

}
