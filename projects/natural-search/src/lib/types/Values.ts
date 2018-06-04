import { NaturalSearchItemConfiguration } from './Configuration';

/**
 * Type for a value
 */
export interface NaturalSearchValue {
    attribute: string;
    value: any;
}

interface RangeValue {
    from: number;
    to: number;
}

interface NumericValue {
    equal?: number;
    greater?: number;
    greaterOrEqual?: number;
    less?: number;
    lessOrEqual?: number;
}

/**
 * Groups are a list of values, that should be interpreted with AND condition
 */
export interface NaturalSearchGroupValues extends Array<NaturalSearchValue> {
}

/**
 * List of groups, that should be interpreted with OR condition
 * Final input / output format
 */
export interface NaturalSearchValues extends Array<NaturalSearchGroupValues> {
}

/**
 * Consolidated type for a value and it's matching configuration
 * Used for configure a mat-input
 */
export interface NaturalSearchConfigurationValue {
    value: NaturalSearchValue;
    configuration: NaturalSearchItemConfiguration;
}

export interface NaturalSearchDropdownResult {
    value?: NaturalSearchValue['value'];
    rendered?: string;
    configuration?: NaturalSearchItemConfiguration;
}
