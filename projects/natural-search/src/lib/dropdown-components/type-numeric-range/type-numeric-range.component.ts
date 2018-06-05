import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { DropdownResult, Selection, RangeValue } from '../../types/Values';
import { TypeRangeConfiguration } from './TypeNumericRangeConfiguration';
import { ErrorStateMatcher } from '@angular/material';
import { DropdownComponent } from '../../types/DropdownComponent';

export class InvalidWithValueStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return form && form.invalid && (form.value.to || form.value.from) || control && control.invalid;
    }
}

// bellow comment fix this : https://github.com/angular/angular/issues/18867
// @dynamic
@Component({
    templateUrl: './type-numeric-range.component.html',
    styleUrls: ['./type-numeric-range.component.scss'],
})
export class TypeNumericRangeComponent implements DropdownComponent<RangeValue>, OnInit {

    public value: Selection['value'];
    public configuration: TypeRangeConfiguration;
    public matcher = new InvalidWithValueStateMatcher();

    public form: FormGroup = new FormGroup({
        from: new FormControl(),
        to: new FormControl(),
    });

    // From || To
    public static AtLeastOneValue(): ValidatorFn {
        return (control: FormControl): { [key: string]: boolean } => {
            const from = parseFloat(control.get('from').value);
            const to = parseFloat(control.get('to').value);

            if (isNaN(from) && isNaN(to)) {
                return {'required': true};
            }

            return null;
        };
    }

    // From > To
    public static ToGtFrom(): ValidatorFn {
        return (control: FormControl): { [key: string]: boolean } => {
            const from = parseFloat(control.get('from').value);
            const to = parseFloat(control.get('to').value);

            if (!isNaN(from) && !isNaN(to) && from >= to) {
                return {'toGtFrom': true};
            }

            return null;
        };
    }

    constructor() {
    }

    ngOnInit() {
    }

    public init(value: RangeValue, configuration: TypeRangeConfiguration): void {
        this.configuration = configuration ? configuration : {};

        const rangeValidators = [
            Validators.min(this.configuration.min),
            Validators.max(this.configuration.max),
        ];

        let fromValidators = rangeValidators;
        let toValidators = rangeValidators;

        if (this.configuration.fromRequired) {
            fromValidators = [Validators.required].concat(fromValidators);
        }
        if (this.configuration.toRequired) {
            toValidators = [Validators.required].concat(toValidators);
        }

        this.form.get('from').setValidators(fromValidators);
        this.form.get('to').setValidators(toValidators);

        this.form.setValidators([
            TypeNumericRangeComponent.AtLeastOneValue(), // At least one value setted
            TypeNumericRangeComponent.ToGtFrom(), // From < To
        ]);

        if (value) {
            this.form.setValue(value);
        }

    }

    public getValue(): RangeValue {
        return {
            from: this.form.get('from').value,
            to: this.form.get('to').value,
        };
    }

    public getRenderedValue(): string {

        const from = this.getValue().from;
        const to = this.getValue().to;

        if (!isNaN(from) && !isNaN(to)) {
            return from + ' - ' + to;
        } else if (!isNaN(from)) {
            return '> ' + from;
        } else if (!isNaN(to)) {
            return '<' + to;
        } else {
            return '';
        }

    }

    public isValid(): boolean {
        return this.form.valid;
    }

}
