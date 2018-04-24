import { Component, Inject, OnInit } from '@angular/core';
import { NATURAL_DROPDOWN_DATA } from '../../dropdown-container/dropdown.service';
import { NaturalSearchDropdownComponent } from '../../interfaces/DropdownComponent';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NaturalSearchConfiguration } from '../../interfaces/Configuration';
import { NaturalDropdownRef } from '../../dropdown-container/dropdown-ref';

@Component({
    selector: 'natural-configuration-selector',
    templateUrl: './configuration-selector.component.html',
    styleUrls: ['./configuration-selector.component.scss'],
})
export class ConfigurationSelectorComponent implements NaturalSearchDropdownComponent, OnInit {

    public value;
    public configurations: NaturalSearchConfiguration;

    public readonly valueChanges = new BehaviorSubject<any>(null);
    public readonly renderedValueChanges = new BehaviorSubject<any>(null);

    constructor(@Inject(NATURAL_DROPDOWN_DATA) public data: any,
                public dropdownRef: NaturalDropdownRef) {
    }

    ngOnInit() {
        this.configurations = this.data.configurations;
    }

    public selectConfig(config) {
        this.dropdownRef.close(config);
    }

    setConfiguration(configuration): void {
    }

    setValue(value: any): void {
    }

    getValue() {
        return null;
    }

}
