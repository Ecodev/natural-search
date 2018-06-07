import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NATURAL_DROPDOWN_DATA } from '../../dropdown-container/dropdown.service';
import { NaturalDropdownRef } from '../../dropdown-container/dropdown-ref';
import { TypeSelectConfiguration, TypeSelectItem } from './TypeSelectConfiguration';
import { DropdownComponent } from '../../types/DropdownComponent';
import { MatSelectionList } from '@angular/material';
import { FilterConditionField, Scalar } from '../../classes/graphql-doctrine.types';

@Component({
    templateUrl: './type-select.component.html',
    styleUrls: ['./type-select.component.scss'],
})
export class TypeSelectComponent implements DropdownComponent, OnInit {

    @ViewChild(MatSelectionList) list: any;
    public configuration: TypeSelectConfiguration;
    public selected: Scalar[];

    constructor(@Inject(NATURAL_DROPDOWN_DATA) public data: any,
                protected dropdownRef: NaturalDropdownRef) {
    }

    ngOnInit() {
    }

    public init(condition: FilterConditionField, configuration: TypeSelectConfiguration): void {

        this.configuration = configuration;

        if (!condition) {
            return;
        }

        if (!configuration.multiple) {
            // value = [value];
            this.list.selectedOptions._multiple = false;
        }
        // nav-list selector needs same references

        // Reload selection
        const possibleIds = configuration.items.map(item => this.getId(item));
        if (condition.in) {
            this.selected = condition.in.values.filter(id => typeof possibleIds.find(i => i === id) !== 'undefined');
        } else {
            this.selected = [];
        }
    }

    public getId(item: TypeSelectItem): Scalar {
        if (typeof item === 'object' && item) {
            return item.id || item.value;
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

    public closeIfSingleAndHasValue() {
        if (!this.configuration.multiple && this.selected.length) {
            this.dropdownRef.close({
                condition: this.getCondition(),
                rendered: this.getRenderedValue(),
            });
        }
    }

    public getCondition(): FilterConditionField {
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

        if (!this.selected) {
            return false;
        }

        return this.selected.length > 0;
    }

}
