import { Component, Inject, OnInit } from '@angular/core';
import { NaturalDropdownContainerComponent } from '../../dropdown-container/dropdown-container.component';
import { FormControl } from '@angular/forms';
import { NATURAL_SEARCH_CONFIGURATIONS, NaturalDropdownRef } from '../../dropdown-container/dropdown-ref';

@Component({
    selector: 'natural-configuration-selector',
    templateUrl: './configuration-selector.component.html',
    styleUrls: ['./configuration-selector.component.scss'],
})
export class ConfigurationSelectorComponent implements OnInit {

    constructor(@Inject(NATURAL_SEARCH_CONFIGURATIONS) public configurations: any,
                public dropdownRef: NaturalDropdownRef,
                public formCtrl: FormControl) {
    }

    ngOnInit() {
    }

    public selectConfig(config) {
        this.dropdownRef.closed.emit(config);
    }

    public close() {

    }

}
