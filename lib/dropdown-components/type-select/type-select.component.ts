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
        if (!configuration.multiple) {
            this.selected = value;

        } else if (configuration.multiple && value) {
            // nav-list selector needs same references
            this.selected = configuration.items.filter((item) => {
                for (const val of value) {
                    if (configuration.matchItems(item, val)) {
                        return true;
                    }
                }
            });
        }
    }

    public select(item) {
        if (this.configuration.multiple) {
            if (!this.selected) {
                this.selected = [];
            }
            this.selected.push(item);

        } else {
            this.selected = item;
            this.dropdownRef.close(item); // close with selection
        }

    }

    public getValue(): NaturalSearchValue['value'] {
        if (this.configuration.multiple) {
            return this.selected.map(option => option);
        } else {
            return this.selected;
        }
    }

    public getRenderedValue(): string {
        if (this.configuration.multiple) {
            return this.selected.map(option => option.name).join(', ');
        } else {
            return this.selected.name;
        }
    }

    public isValid(): boolean {
        if (this.configuration.multiple) {
            return this.selected.length > 0;
        } else {
            return !!this.selected;
        }
    }

}
