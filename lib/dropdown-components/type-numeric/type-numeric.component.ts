import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { NaturalDropdownRef } from '../../dropdown-container/dropdown-ref';
import { NATURAL_DROPDOWN_DATA } from '../../dropdown-container/dropdown.service';
import { NaturalSearchDropdownComponent } from '../../types/DropdownComponent';
import { TypeNumericConfiguration } from './TypeNumericConfiguration';
import { NaturalSearchValue } from '../../types/Values';
import { TouchedOrInitializedErrorStateMatcher } from '../../classes/TouchedOrInitializedErrorStateMatcher';

// bellow comment fix this : https://github.com/angular/angular/issues/18867
// @dynamic
@Component({
    selector: 'natural-type-numeric',
    templateUrl: './type-numeric.component.html',
    styleUrls: ['./type-numeric.component.scss'],
})
export class TypeNumericComponent implements NaturalSearchDropdownComponent, OnInit {

    public value;
    public configuration: TypeNumericConfiguration;
    public formCtrl: FormControl;
    public matcher = new TouchedOrInitializedErrorStateMatcher();

    public static number(params: { min?, max? } = {}): ValidatorFn {
        return (control: FormControl): { [key: string]: boolean } => {

            const val: number = control.value;
            if (!val) {
                return;
            }

            if (isNaN(val)) {
                return {'number': true};

            } else if (!isNaN(params.min) && !isNaN(params.max)) {
                return val < params.min || val > params.max ? {'minmax': true} : null;

            } else if (!isNaN(params.min)) {
                return val < params.min ? {'min': true} : null;

            } else if (!isNaN(params.max)) {
                return val > params.max ? {'max': true} : null;
            } else {

                return null;
            }
        };
    }

    constructor(@Inject(NATURAL_DROPDOWN_DATA) public data: any,
                protected dropdownRef: NaturalDropdownRef,
                protected parentFormControl: FormControl) {
    }

    ngOnInit() {
    }

    public init(value: any, configuration: TypeNumericConfiguration): void {
        this.configuration = configuration;
        this.formCtrl = new FormControl('', TypeNumericComponent.number(configuration));
        this.formCtrl.setValue(value);
    }

    public getValue(): NaturalSearchValue {
        return this.formCtrl.value;
    }

    public getRenderedValue(): string {
        return this.formCtrl.value;
    }

    public isValid(): boolean {
        return this.formCtrl.valid;
    }

}
