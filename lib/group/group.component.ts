import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
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
    @Output() valuesChange = new EventEmitter<NaturalSearchGroupValues>();

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
    }

    public updateInput(value: NaturalSearchValue, index: number) {
        const values = this.values.slice(0);
        values[index] = value;
        this.values = values;
        this.valuesChange.emit(values);
    }

    public addInput(value?: NaturalSearchValue): void {
        this.newValueInput.clear();
        this.values = this.values.concat([value]);
        this.valuesChange.emit(this.values);
    }

    public removeInput(index: number) {
        const values = this.values.slice(0);
        values.splice(index, 1);
        this.values = values;
        this.valuesChange.emit(values);
    }

}
