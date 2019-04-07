import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NaturalSearchConfiguration } from '../types/Configuration';
import { GroupSelections, Selection } from '../types/Values';
import { NaturalInputComponent } from '../input/input.component';
import { deepClone } from '../classes/utils';

@Component({
    selector: 'natural-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss'],
})
export class NaturalGroupComponent {

    @ViewChild('newValueInput') newValueInput: NaturalInputComponent;

    @Input() placeholder;
    @Input() configurations: NaturalSearchConfiguration;
    @Output() selectionChange = new EventEmitter<GroupSelections>();

    @Input() set selections(selection: GroupSelections) {
        this.innerSelections = deepClone(selection);
    }

    public innerSelections: GroupSelections = [];

    public updateInput(selection: Selection, index: number): void {
        this.innerSelections[index] = selection;
        this.selectionChange.emit(this.innerSelections);
    }

    public addInput(selection: Selection): void {
        this.newValueInput.clear();
        this.innerSelections.push(selection);
        this.selectionChange.emit(this.innerSelections);
    }

    public removeInput(index: number): void {
        this.innerSelections.splice(index, 1);
        this.selectionChange.emit(this.innerSelections);
    }

}
