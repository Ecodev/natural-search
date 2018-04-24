import { Component, EventEmitter, OnInit } from '@angular/core';
import { NaturalSearchDropdownComponent } from '../../interfaces/DropdownComponent';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TypeNumericConfiguration } from '../../interfaces/TypeNumericConfiguration';

@Component({
    selector: 'natural-type-numeric',
    templateUrl: './type-numeric.component.html',
    styleUrls: ['./type-numeric.component.scss'],
})
export class TypeNumericComponent implements NaturalSearchDropdownComponent, OnInit {

    public value;

    public configuration: TypeNumericConfiguration;

    public readonly valueChanges = new BehaviorSubject<any>(null);
    public readonly renderedValueChanges = new BehaviorSubject<any>(null);

    constructor() {
    }

    ngOnInit() {
    }

    setConfiguration(configuration: TypeNumericConfiguration): void {
        this.configuration = configuration;
    }

    setValue(value: any): void {
        this.value = value;
    }

}
