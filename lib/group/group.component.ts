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

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.configurations) {
            if (!this.values.length || this.values.length && this.values[this.values.length - 1] !== null) {
                setTimeout(() => {
                    this.addValue();
                });
            }
        }
    }

    public updateValue(value: NaturalSearchValue, index: number) {
        this.values[index] = value;

        if (index === this.values.length - 1) {
            this.addValue();
        }
    }

    public addValue(value?: NaturalSearchValue): NaturalSearchValue {
        value = value ? value : {
            attribute: null,
            value: null,
        };
        this.values.push(value);

        return value;
    }

    public removeValue(index: number) {
        this.values.splice(index, 1);
    }

}
