import { Component, Inject } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    FormGroupDirective,
    NgForm,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { TypeRangeConfiguration } from './TypeNumericRangeConfiguration';
import { ErrorStateMatcher } from '@angular/material';
import { DropdownComponent } from '../../types/DropdownComponent';
import { FilterGroupConditionField } from '../../classes/graphql-doctrine.types';
import { BehaviorSubject } from 'rxjs';
import { NATURAL_DROPDOWN_DATA, NaturalDropDownData } from '../../dropdown-container/dropdown.service';
import { NaturalDropdownRef } from '../../dropdown-container/dropdown-ref';

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
    styleUrls: ['./type-numeric-range.component.scss'],

})
export class TypeNumericRangeComponent implements DropdownComponent {

    public renderedValue = new BehaviorSubject<string>('');
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

    constructor(@Inject(NATURAL_DROPDOWN_DATA) data: NaturalDropDownData, protected dropdownRef: NaturalDropdownRef) {
        this.configuration = {...this.defaults, ...data.configuration as TypeRangeConfiguration};

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

        if (data.condition && data.condition.between) {
            this.form.setValue({from: data.condition.between.from, to: data.condition.between.to});
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

    public close(): void {
        if (this.isValid()) {
            this.dropdownRef.close({condition: this.getCondition()});
        } else {
            this.dropdownRef.close(); // undefined value, discard changes / prevent to add a condition (on new fields
        }
    }

}
