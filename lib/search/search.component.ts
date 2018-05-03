import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChildren } from '@angular/core';
import { NaturalInputComponent } from '../input/input.component';
import { NaturalSearchConfiguration } from '../types/Configuration';
import { NaturalSearchValues } from '../types/Values';

@Component({
    selector: 'natural-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class NaturalSearchComponent implements OnInit, OnChanges {

    @ViewChildren(NaturalInputComponent) inputs: NaturalInputComponent[];

    @Input() configurations: NaturalSearchConfiguration;
    @Input() multipleGroups: boolean;
    @Input() values: NaturalSearchValues;
    @Output() valuesChange = new EventEmitter<NaturalSearchValues>();

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
    }

    public setValue(value, index) {
        const values = this.values.slice(0);
        values[index] = value;
        this.values = values;
        this.valuesChange.emit(values);
    }

    public addGroup() {
        const groups = this.values.slice(0);
        groups.push([]);
        this.values = groups;
        this.valuesChange.emit(this.values);
    }

    public removeGroup(index) {
        const values = this.values.slice(0);
        values.splice(index, 1);
        this.values = values;
        this.valuesChange.emit(values);
    }
}
