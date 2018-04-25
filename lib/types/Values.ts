import { NaturalSearchItemConfiguration } from './Configuration';

/**
 * Type for a value
 */
export interface NaturalSearchValue {
    attribute: any;
    value: any;
}

/**
 * Groups are a list of values, that should be interpreted with AND condition
 */
export interface NaturalSearchGroupValues extends Array<NaturalSearchValue> { }

/**
 * List of groups
 * Final input / output format
 */
export interface NaturalSearchValues extends Array<NaturalSearchGroupValues> { }

/**
 * Consolidated type for a value and it's matching configuration
 * Used for configure a mat-input
 */
export interface NaturalSearchConfigurationValue {
    value: NaturalSearchValue;
    configuration: NaturalSearchItemConfiguration;
}
