import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChildren } from '@angular/core';
import { NaturalInputComponent } from '../input/input.component';
import { NaturalSearchConfiguration } from '../types/Configuration';
import { GroupSelections, NaturalSearchSelections } from '../types/Values';

@Component({
    selector: 'natural-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class NaturalSearchComponent implements OnInit, OnChanges {

    @ViewChildren(NaturalInputComponent) inputs: NaturalInputComponent[];

    @Input() configurations: NaturalSearchConfiguration;
    @Input() multipleGroups: false;
    @Input() selections: NaturalSearchSelections;
    @Output() selectionsChange = new EventEmitter<NaturalSearchSelections>();

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
    }

    public setGroupSelection(groupSelections: GroupSelections, index: number): void {
        const groups = this.selections.slice(0);
        groups[index] = groupSelections;
        this.selections = groups;
        this.selectionsChange.emit(groups);
    }

    public addGroup(): void {
        const groups = this.selections.slice(0);
        groups.push([]);
        this.selections = groups;
        this.selectionsChange.emit(this.selections);
    }

    public removeGroup(index: number): void {
        const groups = this.selections.slice(0);
        groups.splice(index, 1);
        this.selections = groups;
        this.selectionsChange.emit(groups);
    }
}
