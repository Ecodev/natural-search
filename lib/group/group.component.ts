import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NaturalSearchConfiguration } from '../types/Configuration';
import { NaturalSearchGroupValues, NaturalSearchValue } from '../types/Values';

@Component({
    selector: 'natural-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit, OnChanges {

    @Input() configurations: NaturalSearchConfiguration;
    @Input() values: NaturalSearchGroupValues;

    public filters: NaturalSearchGroupValues;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.configurations) {
            this.filters = this.values.map(v => v);
            if (!this.filters.length || this.filters.length && this.filters[this.filters.length - 1] !== null) {
                this.addValue();
            }
        }

    }

    public updateValue(value: NaturalSearchValue, index: number) {
        this.filters[index] = value;

        if (index === this.filters.length - 1) {
            this.addValue();
        }
    }

    public addValue(value?: NaturalSearchValue): NaturalSearchValue {
        value = value ? value : {
            attribute: null,
            value: null,
        };
        this.filters.push(value);

        return value;
    }

    public removeValue(index: number) {
        this.filters.splice(index, 1);
    }

}
