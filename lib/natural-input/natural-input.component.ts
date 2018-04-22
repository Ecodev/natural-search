import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'natural-input',
    templateUrl: './natural-input.component.html',
    styleUrls: ['./natural-input.component.scss'],
})
export class NaturalInputComponent implements OnInit {

    @Input() placeholder = 'Rechercher';
    @Input() readonly = false;

    public inputController: FormControl = new FormControl();

    constructor() {
    }

    ngOnInit() {
    }

}
