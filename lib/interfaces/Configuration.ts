import { NaturalSearchDropdownComponent } from './DropdownComponent';

export interface NaturalSearchItemConfiguration {
    display: string;
    attribute: string;
    value?: any;
    component: NaturalSearchDropdownComponent;
    configuration?: any;
}

export interface NaturalSearchConfiguration {
    [index: number]: NaturalSearchItemConfiguration;
}
