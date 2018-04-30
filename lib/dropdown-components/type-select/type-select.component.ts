import { Component, Inject, OnInit } from '@angular/core';
import { NATURAL_DROPDOWN_DATA } from '../../dropdown-container/dropdown.service';
import { NaturalSearchValue } from '../../types/Values';
import { TypeNumericConfiguration } from '../type-numeric/TypeNumericConfiguration';
import { NaturalDropdownRef } from '../../dropdown-container/dropdown-ref';

@Component({
    selector: 'natural-type-select',
    templateUrl: './type-select.component.html',
    styleUrls: ['./type-select.component.scss'],
})
export class TypeSelectComponent implements OnInit {

    public configuration;

    public selected;

    constructor(@Inject(NATURAL_DROPDOWN_DATA) public data: any,
                protected dropdownRef: NaturalDropdownRef) {
    }

    ngOnInit() {
    }

    public init(value: any, configuration: TypeNumericConfiguration): void {
        this.configuration = configuration;
        this.selected = value;
    }

    public select(item) {
        if (this.configuration.multiple) {
            if (!this.selected) {
                this.selected = [];
            }
            this.selected.push(item);

        } else {
            this.selected = item;
            console.log('this.selected', this.selected);
            this.dropdownRef.close(item); // close with selection
        }

    }

    public getValue(): NaturalSearchValue {
        return this.selected;
    }

    public getRenderedValue(): string {
        if (this.configuration.multiple) {
            return this.selected.map(el => el.name);
        } else {
            return this.selected.name;
        }
    }

    public isValid(): boolean {
        return !!this.selected;
    }

}
