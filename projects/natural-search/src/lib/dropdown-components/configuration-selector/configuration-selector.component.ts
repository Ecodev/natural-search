import { Component, Inject, OnInit } from '@angular/core';
import { DropdownComponent } from '../../types/DropdownComponent';
import { ItemConfiguration, NaturalSearchConfiguration } from '../../types/Configuration';
import { NATURAL_DROPDOWN_DATA } from '../../dropdown-container/dropdown.service';
import { NaturalDropdownRef } from '../../dropdown-container/dropdown-ref';
import { FilterGroupConditionField } from '../../classes/graphql-doctrine.types';
import { BehaviorSubject } from 'rxjs';

@Component({
    templateUrl: './configuration-selector.component.html',
    styleUrls: ['./configuration-selector.component.scss'],
})
export class ConfigurationSelectorComponent implements DropdownComponent, OnInit {
    // Never has a real value
    public renderedValue = new BehaviorSubject<string>('');

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
    public init(condition: FilterGroupConditionField | null, configuration?: ItemConfiguration | null): void {
    }

    /**
     * Get value, including rich object types
     */
    public getCondition(): FilterGroupConditionField {
        return {};
    }

    /**
     * Allow to close the dropdown with a valid value
     */
    public close(): void {
        if (this.selection) {
            this.dropdownRef.close({
                condition: {},
                configuration: this.selection,
            });
        }
    }

    public isValid(): boolean {
        return !!this.selection;
    }

    public isDirty(): boolean {
        return true;
    }

}
