import { Component, Inject, ViewChild } from '@angular/core';
import { NATURAL_DROPDOWN_DATA } from '../../dropdown-container/dropdown.service';
import { NaturalDropdownRef } from '../../dropdown-container/dropdown-ref';
import { TypeSelectConfiguration, TypeSelectItem } from './TypeSelectConfiguration';
import { DropdownComponent } from '../../types/DropdownComponent';
import { MatSelectionList } from '@angular/material';
import { FilterGroupConditionField, Scalar } from '../../classes/graphql-doctrine.types';

@Component({
    templateUrl: './type-select.component.html',
    styleUrls: ['./type-select.component.scss'],
})
export class TypeSelectComponent implements DropdownComponent {

    @ViewChild(MatSelectionList) list: MatSelectionList;
    public configuration: TypeSelectConfiguration;
    public selected: Scalar[] = [];

    private readonly defaults: TypeSelectConfiguration = {
        items: [],
        multiple: true,
    };

    private dirty = false;

    constructor(@Inject(NATURAL_DROPDOWN_DATA) public data: any,
                protected dropdownRef: NaturalDropdownRef) {
        this.configuration = this.defaults;
    }

    public init(condition: FilterGroupConditionField, configuration: TypeSelectConfiguration): void {
        const defaults = {
            items: [],
            multiple: true,
        };
        this.configuration = {...defaults, ...configuration};

        if (!this.isMultiple()) {
            (this.list.selectedOptions as any)._multiple = false;
        }

        // Reload selection, according to possible values from configuration
        if (condition && condition.in) {
            const possibleIds = this.configuration.items.map(item => this.getId(item));
            this.selected = condition.in.values.filter(id => typeof possibleIds.find(i => i === id) !== 'undefined');
        }
    }

    private isMultiple(): boolean {
        return this.configuration.multiple;
    }

    public getId(item: TypeSelectItem): Scalar {
        if (typeof item === 'object' && item) {
            return (item as any).id || (item as any).value;
        }

        return item as Scalar;
    }

    public getDisplay(item: TypeSelectItem): Scalar {
        if (typeof item === 'object' && item && item.name) {
            return item.name;
        }

        return item as Scalar;
    }

    private getItemById(id: Scalar): TypeSelectItem {
        return this.configuration.items.find(item => this.getId(item) === id);
    }

    public closeIfSingleAndHasValue(): void {
        this.dirty = true;
        if (!this.isMultiple() && this.isValid()) {
            this.dropdownRef.close({
                condition: this.getCondition(),
                rendered: this.getRenderedValue(),
            });
        }
    }

    public getCondition(): FilterGroupConditionField {
        return {
            in: {values: this.selected},
        };
    }

    public getRenderedValue(): string {
        if (!this.selected) {
            return '';
        }

        return this.selected.map(id => this.getDisplay(this.getItemById(id))).join(', ');
    }

    public isValid(): boolean {
        return this.selected.length > 0;
    }

    public isDirty(): boolean {
        return this.dirty;
    }

}
