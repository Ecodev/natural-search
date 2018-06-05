import { NaturalSearchDropdownComponent } from './DropdownComponent';
import { Type } from '@angular/core';
import { NaturalSearchValue } from '../types/Values';
import { TypeNumericConfiguration } from '../dropdown-components/type-numeric/TypeNumericConfiguration';
import { TypeSelectConfiguration } from '../dropdown-components/type-select/TypeSelectConfiguration';
import { TypeRangeConfiguration } from '../dropdown-components/type-numeric-range/TypeNumericRangeConfiguration';

export interface NaturalSearchBasicConfiguration {
    /**
     * The label to be used in the GUI
     */
    display: string;

    /**
     * The attribute, or field, this item should apply to.
     *
     * In most cases it should be the property name of the model. Something like:
     *
     * - name
     * - description
     * - artist.name
     */
    attribute: string;
}

/**
 * Configuration for an item that uses a component in a dropdown
 */
export interface NaturalSearchDropdownConfiguration extends NaturalSearchBasicConfiguration {
    component: Type<NaturalSearchDropdownComponent<NaturalSearchValue>>;

    /**
     * Anything that could be useful for the dropdown component
     */
    configuration?: TypeSelectConfiguration | TypeNumericConfiguration | TypeRangeConfiguration | NaturalSearchItemConfiguration;
}

/**
 * Configuration for an item that is only a flag (set or unset)
 */
export interface NaturalSearchFlagConfiguration extends NaturalSearchBasicConfiguration {

    /**
     * The value to be returned when the flag is set
     */
    value: any;
}

export type NaturalSearchItemConfiguration =
    NaturalSearchBasicConfiguration |
    NaturalSearchDropdownConfiguration |
    NaturalSearchFlagConfiguration;

/**
 * Exhaustive list of configurations
 */
export interface NaturalSearchConfiguration extends Array<NaturalSearchItemConfiguration> {
}
