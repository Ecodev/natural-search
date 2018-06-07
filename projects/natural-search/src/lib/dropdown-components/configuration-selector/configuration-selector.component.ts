import { Component, Inject, OnInit } from '@angular/core';
import { DropdownComponent } from '../../types/DropdownComponent';
import { ItemConfiguration, NaturalSearchConfiguration } from '../../types/Configuration';
import { NATURAL_DROPDOWN_DATA } from '../../dropdown-container/dropdown.service';
import { NaturalDropdownRef } from '../../dropdown-container/dropdown-ref';
import { FilterConditionField } from '../../classes/graphql-doctrine.types';

@Component({
    templateUrl: './configuration-selector.component.html',
    styleUrls: ['./configuration-selector.component.scss'],
})
export class ConfigurationSelectorComponent implements DropdownComponent, OnInit {

    public configurations: NaturalSearchConfiguration;

    public selection;

    constructor(@Inject(NATURAL_DROPDOWN_DATA) public data: any,
                protected dropdownRef: NaturalDropdownRef) {
    }

    ngOnInit() {
        this.configurations = this.data.configurations;
    }

    /**
     * Set condition for component initialisation purposes
     */
    public init(condition: FilterConditionField, configuration?: ItemConfiguration): void {
    }

    /**
     * Get value, including rich object types
     */
    public getCondition(): FilterConditionField {
        return null;
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
