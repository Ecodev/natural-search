import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { DropdownComponent } from '../../types/DropdownComponent';
import { TypeNumericConfiguration } from './TypeNumericConfiguration';
import { ErrorStateMatcher } from '@angular/material';
import { FilterConditionField } from '../../classes/graphql-doctrine.types';

export class InvalidWithValueStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control && control.invalid && control.value;
    }
}

@Component({
    templateUrl: './type-numeric.component.html',
    styleUrls: ['./type-numeric.component.scss'],
})
export class TypeNumericComponent implements DropdownComponent, OnInit {

    public condition: FilterConditionField;
    public configuration: TypeNumericConfiguration;
    public formCtrl: FormControl = new FormControl();
    public matcher = new InvalidWithValueStateMatcher();

    // @Inject(NATURAL_DROPDOWN_DATA) public data: any
    constructor() {
    }

    ngOnInit() {
    }

    public init(condition: FilterConditionField, configuration: TypeNumericConfiguration): void {
        this.configuration = configuration ? configuration : {};

        this.formCtrl.setValidators([
            Validators.required,
            Validators.max(this.configuration.max),
            Validators.min(this.configuration.min),
        ]);

        if (condition) {
            this.formCtrl.setValue(condition.equal.value);
        }
    }

    public getCondition(): FilterConditionField {
        return {equal: {value: this.formCtrl.value}};
    }

    public getRenderedValue(): string {
        return this.formCtrl.value;
    }

    public isValid(): boolean {
        return this.formCtrl.valid;
    }

}
