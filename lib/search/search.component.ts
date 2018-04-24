import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NaturalSearchConfiguration } from '../interfaces/Configuration';

@Component({
    selector: 'natural-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class NaturalSearchComponent implements OnInit, OnChanges {

    @Input() configuration: NaturalSearchConfiguration;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log('changes', changes);



    }

}
