import { Component, Inject, OnInit } from '@angular/core';
import { NaturalSearchDropdownComponent } from '../../types/DropdownComponent';
import { NaturalSearchConfiguration } from '../../types/Configuration';
import { NATURAL_DROPDOWN_DATA } from '../../dropdown-container/dropdown.service';
import { NaturalDropdownRef } from '../../dropdown-container/dropdown-ref';

@Component({
    selector: 'natural-configuration-selector',
    templateUrl: './configuration-selector.component.html',
    styleUrls: ['./configuration-selector.component.scss'],
})
export class ConfigurationSelectorComponent implements NaturalSearchDropdownComponent, OnInit {

    public configurations: NaturalSearchConfiguration;

    constructor(@Inject(NATURAL_DROPDOWN_DATA) public data: any,
                protected dropdownRef: NaturalDropdownRef) {
    }

    ngOnInit() {
        this.configurations = this.data.configurations;
    }

    /**
     * Set value for component initialisation purposes
     * @param value
     */
    public init(value: any): void {
    }

    /**
     * Get value, including rich object types
     */
    public getValue(): any {
        return null;
    }

    /**
     * Return actual value as string
     */
    public getRenderedValue(): string {
        return '';
    }

    /**
     * Allow to close the dropdown with a valid value
     */
    protected close(value: any): void {
        this.dropdownRef.close(value);
    }

    public isValid(): boolean {
        return true;
    }

}
