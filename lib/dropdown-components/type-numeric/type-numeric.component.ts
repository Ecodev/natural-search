import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NaturalDropdownRef } from '../../dropdown-container/dropdown-ref';
import { NATURAL_DROPDOWN_DATA } from '../../dropdown-container/dropdown.service';
import { NaturalSearchDropdownComponent } from '../../types/DropdownComponent';
import { TypeNumericConfiguration } from './TypeNumericConfiguration';
import { NaturalSearchValue } from '../../types/Values';

@Component({
    selector: 'natural-type-numeric',
    templateUrl: './type-numeric.component.html',
    styleUrls: ['./type-numeric.component.scss'],
})
export class TypeNumericComponent implements NaturalSearchDropdownComponent {

    public value;
    public configuration: TypeNumericConfiguration;

    constructor(@Inject(NATURAL_DROPDOWN_DATA) public data: any,
                protected dropdownRef: NaturalDropdownRef,
                protected formControl: FormControl) {
    }

    public setConfiguration(configuration: TypeNumericConfiguration): void {
        this.configuration = configuration;
    }

    public initValue(value: any): void {
        this.value = value;
    }

    public getValue(): NaturalSearchValue {
        return this.value;
    }

    public getRenderedValue(): string {
        return this.value;
    }

}
