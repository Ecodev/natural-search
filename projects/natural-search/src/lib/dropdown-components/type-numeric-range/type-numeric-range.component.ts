import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormGroupDirective,
    NgForm,
    ValidatorFn,
    Validators,
    ValidationErrors,
    AbstractControl,
} from '@angular/forms';
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

function parseFromControl(control: FormControl, key: string): number {
    const c = control.get(key);
    if (!c) {
        return NaN;
    }

    return parseFloat(c.value);
}

/**
 * At least one value set
 */
function atLeastOneValue(): ValidatorFn {
    return (control: FormControl): ValidationErrors | null => {
        const from = parseFromControl(control, 'from');
        const to = parseFromControl(control, 'to');

        if (isNaN(from) && isNaN(to)) {
            return {required: true};
        }

        return null;
    };
}

/**
 * From > To
 */
function toGreaterThanFrom(): ValidatorFn {
    return (control: FormControl): ValidationErrors | null => {
        const from = parseFromControl(control, 'from');
        const to = parseFromControl(control, 'to');

        if (!isNaN(from) && !isNaN(to) && from >= to) {
            return {toGreaterThanFrom: true};
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

    public init(condition: FilterGroupConditionField | null, configuration: TypeRangeConfiguration | null): void {
        this.configuration = {...this.defaults, ...configuration};

        this.form.valueChanges.subscribe(() => {
            this.renderedValue.next(this.getRenderedValue());
        });

        const rangeValidators: ValidatorFn[] = [];
        if (this.configuration.min) {
            rangeValidators.push(Validators.min(this.configuration.min));
        }

        if (this.configuration.max) {
            rangeValidators.push(Validators.max(this.configuration.max));
        }

        let fromValidators = rangeValidators;
        let toValidators = rangeValidators;

        if (this.configuration.fromRequired) {
            fromValidators = [Validators.required].concat(fromValidators);
        }
        if (this.configuration.toRequired) {
            toValidators = [Validators.required].concat(toValidators);
        }

        this.getFrom().setValidators(fromValidators);
        this.getTo().setValidators(toValidators);

        this.form.setValidators([
            atLeastOneValue(),
            toGreaterThanFrom(), // From < To
        ]);

        if (condition && condition.between) {
            this.form.setValue({from: condition.between.from, to: condition.between.to});
        }
    }

    public getCondition(): FilterGroupConditionField {
        return {
            between: {
                from: this.getFrom().value,
                to: this.getTo().value,
            },
        };
    }

    public getFrom(): AbstractControl {
        return this.form.get('from') as AbstractControl;
    }

    public getTo(): AbstractControl {
        return this.form.get('to') as AbstractControl;
    }

    private getRenderedValue(): string {
        const between = this.getCondition().between;
        if (!between) {
            return '';
        }

        const from = parseFloat(between.from as string);
        const to = parseFloat(between.to as string);

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
