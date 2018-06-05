import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NaturalSearchConfiguration } from '../types/Configuration';
import { GroupSelections, Selection } from '../types/Values';
import { NaturalInputComponent } from '../input/input.component';
import { InputOutput } from '../classes/input-output';

@Component({
    selector: 'natural-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss'],
})
export class NaturalGroupComponent implements OnInit, OnChanges {

    @ViewChild('newValueInput') newValueInput: NaturalInputComponent;

    @Input() configurations: NaturalSearchConfiguration;
    @Input() groupSelections: GroupSelections;
    @Output() groupSelectionsChange = new EventEmitter<GroupSelections>();

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
    }

    public updateInput(value: Selection, index: number) {
        const values = this.groupSelections.slice(0);
        values[index] = value;
        this.groupSelections = values;
        this.groupSelectionsChange.emit(values);
    }

    public addInput(selection?: Selection): void {
        this.newValueInput.clear();
        this.groupSelections = this.groupSelections.concat([selection]);
        this.groupSelectionsChange.emit(this.groupSelections);
    }

    public removeInput(index: number) {
        const values = this.groupSelections.slice(0);
        values.splice(index, 1);
        this.groupSelections = values;
        this.groupSelectionsChange.emit(values);
    }

}
