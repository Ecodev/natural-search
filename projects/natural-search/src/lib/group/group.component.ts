import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NaturalSearchConfiguration } from '../types/Configuration';
import { GroupSelections, Selection } from '../types/Values';
import { NaturalInputComponent } from '../input/input.component';

@Component({
    selector: 'natural-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss'],
})
export class NaturalGroupComponent implements OnInit, OnChanges {

    @ViewChild('newValueInput') newValueInput: NaturalInputComponent;

    @Input() configurations: NaturalSearchConfiguration;
    @Output() groupSelectionChange = new EventEmitter<GroupSelections>();

    @Input() set groupSelections(selection: GroupSelections) {
        this.innerGroupSelections = selection.slice();
    }

    public innerGroupSelections: GroupSelections = [];

    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    public updateInput(selection: Selection, index: number): void {
        this.innerGroupSelections[index] = selection;
        this.groupSelectionChange.emit(this.innerGroupSelections);
    }

    public addInput(selection: Selection): void {
        this.newValueInput.clear();
        this.innerGroupSelections.push(selection);
        this.groupSelectionChange.emit(this.innerGroupSelections);
    }

    public removeInput(index: number): void {
        this.innerGroupSelections.splice(index, 1);
        this.groupSelectionChange.emit(this.innerGroupSelections);
    }

}
