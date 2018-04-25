import {
    AfterContentInit,
    Component,
    ElementRef,
    EventEmitter,
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
import { NaturalDropdownService } from '../dropdown-container/dropdown.service';
import { NaturalSearchValue } from '../types/Values';
import { InputOutput } from '../classes/input-output';
import { NaturalDropdownRef } from '../dropdown-container/dropdown-ref';

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

    constructor(private element: ElementRef,
                private dropdown: NaturalDropdownService) {
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
            this.formCtrl.setValue(this.value.value);
        }
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

        this.dropdown.open(ConfigurationSelectorComponent, this.element, this.formCtrl, data).closed.subscribe(config => {
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

        this.dropdownRef = this.dropdown.open(this.configuration.component, this.element, this.formCtrl, data);
        this.dropdownRef.closed.subscribe((result: NaturalSearchValue['value']) => {
            this.valueChanges.emit({
                attribute: this.configuration.attribute,
                value: result,
            });
        });

    }

}
