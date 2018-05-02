import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { NaturalSearchDropdownComponent } from '../../types/DropdownComponent';
import { TypeNumericConfiguration } from './TypeNumericConfiguration';
import { NaturalSearchDropdownResult, NaturalSearchValue } from '../../types/Values';
import { ErrorStateMatcher } from '@angular/material';

export class InvalidWithValueStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control && control.invalid && control.value;
    }
}

@Component({
    selector: 'natural-type-numeric',
    templateUrl: './type-numeric.component.html',
    styleUrls: ['./type-numeric.component.scss'],
})
export class TypeNumericComponent implements NaturalSearchDropdownComponent, OnInit {

    public value: NaturalSearchValue['value'];
    public configuration: TypeNumericConfiguration;
    public formCtrl: FormControl = new FormControl();
    public matcher = new InvalidWithValueStateMatcher();

    // @Inject(NATURAL_DROPDOWN_DATA) public data: any
    constructor() {
    }

    ngOnInit() {
    }

    public init(value: NaturalSearchDropdownResult['value'], configuration: TypeNumericConfiguration): void {
        this.configuration = configuration ? configuration : {};

        this.formCtrl.setValidators([
            Validators.required,
            Validators.max(this.configuration.max),
            Validators.min(this.configuration.min),
        ]);

        this.formCtrl.setValue(value);
    }

    public getValue(): NaturalSearchValue['value'] {
        return this.formCtrl.value;
    }

    public getRenderedValue(): string {
        return this.formCtrl.value;
    }

    public isValid(): boolean {
        return this.formCtrl.valid;
    }

}
