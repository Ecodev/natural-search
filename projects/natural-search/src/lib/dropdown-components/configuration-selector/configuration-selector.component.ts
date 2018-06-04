import { Component, Inject, OnInit } from '@angular/core';
import { NaturalSearchDropdownComponent } from '../../types/DropdownComponent';
import { NaturalSearchConfiguration, NaturalSearchItemConfiguration } from '../../types/Configuration';
import { NATURAL_DROPDOWN_DATA } from '../../dropdown-container/dropdown.service';
import { NaturalDropdownRef } from '../../dropdown-container/dropdown-ref';
import { NaturalSearchDropdownResult } from '../../types/Values';

@Component({
    templateUrl: './configuration-selector.component.html',
    styleUrls: ['./configuration-selector.component.scss'],
})
export class ConfigurationSelectorComponent implements NaturalSearchDropdownComponent<any>, OnInit {

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
    public init(value: any, configuration?: NaturalSearchItemConfiguration): void {
    }

    /**
     * Get value, including rich object types
     */
    public getValue(): any {
        return undefined;
    }

    /**
     * Return current value as string
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
