import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'natural-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class NaturalSearchComponent implements OnInit {

    @Input() configuration: any;

    constructor() {
    }

    ngOnInit() {
    }

}
