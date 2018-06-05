import { ItemConfiguration } from './Configuration';
import { FilterConditionField } from '../classes/graphql-doctrine.types';

/**
 * Type for a search selection
 */
export interface Selection {
    attribute: string;
    condition: FilterConditionField;
}

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
    condition?: FilterConditionField;
    rendered?: string;
    configuration?: ItemConfiguration;
}
