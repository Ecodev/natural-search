import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { Selection } from '../../types/Values';
import { TypeRangeConfiguration } from './TypeNumericRangeConfiguration';
import { ErrorStateMatcher } from '@angular/material';
import { DropdownComponent } from '../../types/DropdownComponent';
import { FilterGroupConditionField } from '../../classes/graphql-doctrine.types';
import { BehaviorSubject } from 'rxjs';

export class InvalidWithValueStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return form && form.invalid && (form.value.to || form.value.from) || control && control.invalid;
    }
}

/**
 * At least one value set
 */
function atLeastOneValue(): ValidatorFn {
    return (control: FormControl): { [key: string]: boolean } => {
        const from = parseFloat(control.get('from').value);
        const to = parseFloat(control.get('to').value);

        if (isNaN(from) && isNaN(to)) {
            return {'required': true};
        }

        return null;
    };
}

/**
 * From > To
 */
function toGreaterThanFrom(): ValidatorFn {
    return (control: FormControl): { [key: string]: boolean } => {
        const from = parseFloat(control.get('from').value);
        const to = parseFloat(control.get('to').value);

        if (!isNaN(from) && !isNaN(to) && from >= to) {
            return {'toGreaterThanFrom': true};
        }

        return null;
    };
}

@Component({
    templateUrl: './type-numeric-range.component.html',
})
export class TypeNumericRangeComponent implements DropdownComponent {

    public renderedValue = new BehaviorSubject<string>('');
    public value: Selection['condition'];
    public configuration: TypeRangeConfiguration;
    public matcher = new InvalidWithValueStateMatcher();

    public form: FormGroup = new FormGroup({
        from: new FormControl(),
        to: new FormControl(),
    });

    private readonly defaults: TypeRangeConfiguration = {
        min: null,
        max: null,
        step: null,
        fromRequired: true,
        toRequired: true,
    };

    constructor() {
        this.configuration = this.defaults;
    }

    public init(condition: FilterGroupConditionField, configuration: TypeRangeConfiguration): void {
        this.configuration = {...this.defaults, ...configuration};

        this.form.valueChanges.subscribe(() => {
            this.renderedValue.next(this.getRenderedValue());
        });

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
            atLeastOneValue(),
            toGreaterThanFrom(), // From < To
        ]);

        if (condition) {
            this.form.setValue({from: condition.between.from, to: condition.between.to});
        }
    }

    public getCondition(): FilterGroupConditionField {
        return {
            between: {
                from: this.form.get('from').value,
                to: this.form.get('to').value,
            },
        };
    }

    private getRenderedValue(): string {
        const from = parseFloat(this.getCondition().between.from as string);
        const to = parseFloat(this.getCondition().between.to as string);

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

    public isDirty(): boolean {
        return this.form.dirty;
    }

}
