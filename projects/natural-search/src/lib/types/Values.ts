import { NaturalSearchItemConfiguration } from './Configuration';

/**
 * Type for a search selection
 */
export interface NaturalSearchSelection {
    attribute: string;
    value: NaturalSearchValue | NaturalSearchValue[];
}

export interface RangeValue {
    from: number;
    to: number;
}

export interface NumericValue {
    equal?: number;
    greater?: number;
    greaterOrEqual?: number;
    less?: number;
    lessOrEqual?: number;
}

export type NaturalSearchValue = string | number | RangeValue | NumericValue;

/**
 * Groups are a list of values, that should be interpreted with AND condition
 */
export interface NaturalSearchGroupSelections extends Array<NaturalSearchSelection> {
}

/**
 * List of groups, that should be interpreted with OR condition
 * Final input / output format
 */
export interface NaturalSearchSelections extends Array<NaturalSearchGroupSelections> {
}

/**
 * Consolidated type for a selection and it's matching configuration
 * Used internally for dropdown
 */
export interface NaturalSearchDropdownResult {
    value?: NaturalSearchSelection['value'];
    rendered?: string;
    configuration?: NaturalSearchItemConfiguration;
}
