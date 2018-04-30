import { Component, Inject, OnInit } from '@angular/core';
import { NATURAL_DROPDOWN_DATA } from '../../dropdown-container/dropdown.service';
import { NaturalSearchValue } from '../../types/Values';
import { NaturalDropdownRef } from '../../dropdown-container/dropdown-ref';
import { TypeSelectConfiguration } from './TypeSelectConfiguration';
import { AbstractController } from '../../classes/AbstractController';

@Component({
    selector: 'natural-type-select',
    templateUrl: './type-select.component.html',
    styleUrls: ['./type-select.component.scss'],
})
export class TypeSelectComponent extends AbstractController implements OnInit {

    public configuration;
    public selected;

    constructor(@Inject(NATURAL_DROPDOWN_DATA) public data: any,
                protected dropdownRef: NaturalDropdownRef) {
        super();
    }

    ngOnInit() {
    }

    public init(value: any, configuration: TypeSelectConfiguration): void {

        this.configuration = configuration;

        if (!value) {
            return;
        }

        if (!configuration.multiple) {
            value = [value];
        }

        // nav-list selector needs same references
        this.selected = configuration.items.filter((item) => {
            for (const val of value) {
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

    public select(item) {
        console.log('select', item);
        if (!this.configuration.multiple) {
            this.selected = item;
            this.dropdownRef.close(item[0]);
        }
    }

    public getValue(): NaturalSearchValue['value'] {
        if (this.configuration.multiple) {
            return this.selected.map(option => option);
        } else {
            return this.selected[0];
        }
    }

    public getRenderedValue(): string {
        return this.selected.map(option => this.getDisplay(option)).join(', ');
    }

    public isValid(): boolean {
        return this.selected.length > 0;
    }

}
