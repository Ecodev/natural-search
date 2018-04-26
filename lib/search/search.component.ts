import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChildren } from '@angular/core';
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
    @Input() values: NaturalSearchValues;
    @Input() multipleGroups: boolean;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
    }

    public addGroup() {
        this.values.push([]);
    }

    public removeGroup(index) {
        this.values.splice(index, 1);
    }

}
