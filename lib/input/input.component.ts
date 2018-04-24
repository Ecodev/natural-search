import { AfterContentInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material';
import { FormControl } from '@angular/forms';
import { NaturalSearchConfiguration, NaturalSearchItemConfiguration } from '../interfaces/Configuration';
import { ConfigurationSelectorComponent } from '../dropdown-components/configuration-selector/configuration-selector.component';
import { NaturalDropdownService } from '../dropdown-container/dropdown.service';

@Component({
    selector: 'natural-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
})
export class NaturalInputComponent implements OnInit, OnDestroy, AfterContentInit {

    @Input() placeholder = 'Rechercher';
    @Input() readonly = false;
    @Input() configurations: NaturalSearchConfiguration;

    @Input() public configuration: NaturalSearchItemConfiguration;
    @Output() configurationChange = new EventEmitter<NaturalSearchItemConfiguration>();

    @ViewChild(MatRipple) ripple: MatRipple;
    @ViewChild('input') input: ElementRef;

    public formCtrl: FormControl = new FormControl();

    private dropdownRef;

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

        this.formCtrl.valueChanges.subscribe((val) => {
            if (val) {
                this.dropdownRef.close();
            }
        });
    }

    ngOnDestroy() {
    }

    ngAfterContentInit() {
    }

    public clear() {
        this.configuration = null;
        this.formCtrl.setValue('');
    }

    public launchRipple() {
        const rippleRef = this.ripple.launch({
            persistent: true,
            centered: true,
        });

        // Fade out the ripple later.
        rippleRef.fadeOut();
    }

    public openConfigurationsDropdown() {

        const data = {
            configurations: this.configurations,
            formCtrl: this.formCtrl,
        };

        this.dropdown.open(ConfigurationSelectorComponent, this.element, data).closed.subscribe(config => {
            if (config) {
                this.configuration = config;
                this.openTypeDropdown();
            }
        });

    }

    public openTypeDropdown(): void {

        const data = {
            configuration: this.configuration,
            formCtrl: this.formCtrl,
            value: this.formCtrl.value,
        };

        this.dropdownRef = this.dropdown.open(this.configuration.component, this.element, data);
        this.dropdownRef.closed.subscribe(result => {
        });

    }

}
