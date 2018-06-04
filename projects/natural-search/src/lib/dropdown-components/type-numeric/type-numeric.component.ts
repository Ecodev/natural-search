import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { NaturalSearchDropdownComponent } from '../../types/DropdownComponent';
import { TypeNumericConfiguration } from './TypeNumericConfiguration';
import { NaturalSearchDropdownResult, NaturalSearchSelection } from '../../types/Values';
import { ErrorStateMatcher } from '@angular/material';

export class InvalidWithValueStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control && control.invalid && control.value;
    }
}

@Component({
    templateUrl: './type-numeric.component.html',
    styleUrls: ['./type-numeric.component.scss'],
})
export class TypeNumericComponent implements NaturalSearchDropdownComponent<number>, OnInit {

    public value: NaturalSearchSelection['value'];
    public configuration: TypeNumericConfiguration;
    public formCtrl: FormControl = new FormControl();
    public matcher = new InvalidWithValueStateMatcher();

    // @Inject(NATURAL_DROPDOWN_DATA) public data: any
    constructor() {
    }

    ngOnInit() {
    }

    public init(value: number, configuration: TypeNumericConfiguration): void {
        this.configuration = configuration ? configuration : {};

        this.formCtrl.setValidators([
            Validators.required,
            Validators.max(this.configuration.max),
            Validators.min(this.configuration.min),
        ]);

        this.formCtrl.setValue(value);
    }

    public getValue(): number {
        return this.formCtrl.value;
    }

    public getRenderedValue(): string {
        return this.formCtrl.value;
    }

    public isValid(): boolean {
        return this.formCtrl.valid;
    }

}
