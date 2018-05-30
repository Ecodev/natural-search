import { Component, Inject, OnInit } from '@angular/core';
import { NaturalSearchDropdownComponent } from '../../types/DropdownComponent';
import { NaturalSearchConfiguration, NaturalSearchItemConfiguration } from '../../types/Configuration';
import { NATURAL_DROPDOWN_DATA } from '../../dropdown-container/dropdown.service';
import { NaturalDropdownRef } from '../../dropdown-container/dropdown-ref';
import { NaturalSearchDropdownResult } from '../../types/Values';

@Component({
    selector: 'natural-configuration-selector',
    templateUrl: './configuration-selector.component.html',
    styleUrls: ['./configuration-selector.component.scss'],
})
export class ConfigurationSelectorComponent implements NaturalSearchDropdownComponent, OnInit {

    public configurations: NaturalSearchConfiguration;

    public selection;

    constructor(@Inject(NATURAL_DROPDOWN_DATA) public data: any,
                protected dropdownRef: NaturalDropdownRef) {
    }

    ngOnInit() {
        this.configurations = this.data.configurations;
    }

    /**
     * Set value for component initialisation purposes
     */
    public init(value: NaturalSearchDropdownResult['value'], configuration?: NaturalSearchItemConfiguration): void {
    }

    /**
     * Get value, including rich object types
     */
    public getValue(): NaturalSearchDropdownResult {
        return undefined;
    }

    /**
     * Return actual value as string
     */
    public getRenderedValue(): string {
        return '';
    }

    /**
     * Allow to close the dropdown with a valid value
     */
    public close(): void {
        if (this.selection) {
            this.dropdownRef.close({
                configuration: this.selection,
            });
        }
    }

    public isValid(): boolean {
        return !!this.selection;
    }

}
