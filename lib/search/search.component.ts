import { Component, Input, OnInit } from '@angular/core';
import { NaturalSearchConfiguration } from '../interfaces/Configuration';

@Component({
    selector: 'natural-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class NaturalSearchComponent implements OnInit {

    @Input() configuration: NaturalSearchConfiguration;

    constructor() {
    }

    ngOnInit() {
    }

}
