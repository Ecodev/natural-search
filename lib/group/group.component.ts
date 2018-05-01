import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NaturalSearchConfiguration } from '../types/Configuration';
import { NaturalSearchGroupValues, NaturalSearchValue } from '../types/Values';
import { NaturalInputComponent } from '../input/input.component';

@Component({
    selector: 'natural-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss'],
})
export class NaturalGroupComponent implements OnInit, OnChanges {

    @ViewChild('newValueInput') newValueInput: NaturalInputComponent;

    @Input() configurations: NaturalSearchConfiguration;
    @Input() values: NaturalSearchGroupValues;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
    }

    public setValue(value: NaturalSearchValue, index: number) {
        this.values[index] = value;
    }

    public addValue(value?: NaturalSearchValue): void {
        this.newValueInput.clear();
        this.values.push(value);
    }

    public removeValue(index: number) {
        this.values.splice(index, 1);
    }

}
