import { DropdownComponent } from './DropdownComponent';
import { Type } from '@angular/core';
import { Selection } from './Values';
import { TypeNumericConfiguration } from '../dropdown-components/type-numeric/TypeNumericConfiguration';
import { TypeSelectConfiguration } from '../dropdown-components/type-select/TypeSelectConfiguration';
import { TypeRangeConfiguration } from '../dropdown-components/type-numeric-range/TypeNumericRangeConfiguration';

export interface BasicConfiguration {
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

    /**
     * A function to transform the selection before it is applied onto the filter.
     *
     * This would typically be useful to do unit conversion so the GUI has some user
     * friendly values, but the API works with a "low-level" unit.
     */
    transform?: (Selection) => Selection;
}

/**
 * Configuration for an item that uses a component in a dropdown
 */
export interface DropdownConfiguration extends BasicConfiguration {
    component: Type<DropdownComponent>;

    /**
     * Anything that could be useful for the dropdown component
     */
    configuration?: TypeSelectConfiguration | TypeNumericConfiguration | TypeRangeConfiguration | ItemConfiguration;
}

/**
 * Configuration for an item that is only a flag (set or unset)
 */
export interface FlagConfiguration extends BasicConfiguration {

    /**
     * The value to be returned when the flag is set
     */
    condition: any;
}

export type ItemConfiguration =
    BasicConfiguration |
    DropdownConfiguration |
    FlagConfiguration;

/**
 * Exhaustive list of configurations
 */
export interface NaturalSearchConfiguration extends Array<ItemConfiguration> {
}
