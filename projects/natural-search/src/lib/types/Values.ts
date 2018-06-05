import { ItemConfiguration } from './Configuration';

/**
 * Type for a search selection
 */
export interface Selection {
    attribute: string;
    value: Value | Value[];
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

export type Value = string | number | RangeValue | NumericValue;

/**
 * Groups are a list of values, that should be interpreted with AND condition
 */
export interface GroupSelections extends Array<Selection> {
}

/**
 * List of groups, that should be interpreted with OR condition
 * Final input / output format
 */
export interface NaturalSearchSelections extends Array<GroupSelections> {
}

/**
 * Consolidated type for a selection and it's matching configuration
 * Used internally for dropdown
 */
export interface DropdownResult {
    value?: Selection['value'];
    rendered?: string;
    configuration?: ItemConfiguration;
}
