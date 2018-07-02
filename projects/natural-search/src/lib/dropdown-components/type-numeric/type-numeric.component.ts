import { Component, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, ValidatorFn } from '@angular/forms';
import { DropdownComponent } from '../../types/DropdownComponent';
import { TypeNumericConfiguration } from './TypeNumericConfiguration';
import { ErrorStateMatcher } from '@angular/material';
import { FilterGroupConditionField } from '../../classes/graphql-doctrine.types';
import { BehaviorSubject } from 'rxjs';
import { NATURAL_DROPDOWN_DATA, NaturalDropDownData } from '../../dropdown-container/dropdown.service';
import { ConfigurationSelectorConfiguration } from '../configuration-selector/ConfigurationSelectorConfiguration';
import { NaturalDropdownRef } from '../../dropdown-container/dropdown-ref';

export class InvalidWithValueStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control && control.invalid && control.value;
    }
}

@Component({
    templateUrl: './type-numeric.component.html',
})
export class TypeNumericComponent implements DropdownComponent {

    public renderedValue = new BehaviorSubject<string>('');
    public configuration: TypeNumericConfiguration = {};
    public formCtrl: FormControl = new FormControl();
    public matcher = new InvalidWithValueStateMatcher();

    constructor(@Inject(NATURAL_DROPDOWN_DATA) data: NaturalDropDownData) {
        this.configuration = data.configuration as TypeNumericConfiguration || {};

        this.formCtrl.valueChanges.subscribe(value => {
            this.renderedValue.next(value === null ? '' : this.formCtrl.value + '');
        });

        const validators: ValidatorFn[] = [Validators.required];
        if (this.configuration.min) {
            validators.push(Validators.min(this.configuration.min));
        }

        if (this.configuration.max) {
            validators.push(Validators.max(this.configuration.max));
        }

        this.formCtrl.setValidators(validators);

        if (data.condition && data.condition.equal) {
            this.formCtrl.setValue(data.condition.equal.value);
        }
    }

    public getCondition(): FilterGroupConditionField {
        return {equal: {value: this.formCtrl.value}};
    }

    public isValid(): boolean {
        return this.formCtrl.valid;
    }

    public isDirty(): boolean {
        return this.formCtrl.dirty;
    }

}
