import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NATURAL_DROPDOWN_DATA } from '../../dropdown-container/dropdown.service';
import { NaturalDropdownRef } from '../../dropdown-container/dropdown-ref';
import { TypeSelectConfiguration } from './TypeSelectConfiguration';
import { DropdownComponent } from '../../types/DropdownComponent';
import { MatSelectionList } from '@angular/material';
import { FilterConditionField } from '../../classes/graphql-doctrine.types';

@Component({
    templateUrl: './type-select.component.html',
    styleUrls: ['./type-select.component.scss'],
})
export class TypeSelectComponent implements DropdownComponent, OnInit {

    @ViewChild(MatSelectionList) list: any;
    public configuration: TypeSelectConfiguration;
    public selected;

    constructor(@Inject(NATURAL_DROPDOWN_DATA) public data: any,
                protected dropdownRef: NaturalDropdownRef) {
    }

    ngOnInit() {
    }

    public init(value: FilterConditionField, configuration: TypeSelectConfiguration): void {

        this.configuration = configuration;

        if (!value) {
            return;
        }

        if (!configuration.multiple) {
            // value = [value];
            this.list.selectedOptions._multiple = false;
        }

        // nav-list selector needs same references
        this.selected = configuration.items.filter((item) => {
            for (const val of value.in.values) {
                if (configuration.matchItems(item, val)) {
                    return true;
                }
            }
        });
    }

    public getDisplay(item) {
        if (!!this.configuration.displayWith) {
            return this.configuration.displayWith(item);
        }

        if (typeof item === 'string') {
            return item;
        }

        if (item && item.name) {
            return item.name;
        }

        return item;
    }

    public closeIfSingleAndHasValue() {
        if (!this.configuration.multiple && this.selected.length) {
            this.dropdownRef.close({
                value: this.getValue(),
                rendered: this.getRenderedValue(),
            });
        }
    }

    public getValue(): FilterConditionField {
        if (this.configuration.multiple) {
            return this.selected.map(option => option);
        } else {
            return this.selected[0];
        }
    }

    public getRenderedValue(): string {

        if (!this.selected) {
            return '';
        }

        return this.selected.map(option => this.getDisplay(option)).join(', ');
    }

    public isValid(): boolean {

        if (!this.selected) {
            return false;
        }

        return this.selected.length > 0;
    }

}
