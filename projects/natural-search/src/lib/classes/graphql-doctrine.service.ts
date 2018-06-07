import { isString } from 'lodash';
import { NaturalSearchConfiguration } from '../types/Configuration';
import { NaturalSearchSelections, Selection } from '../types/Values';
import { Filter, FilterConditionField, FilterConditionFields, FilterJoins } from './graphql-doctrine.types';
import { getConfigurationFromSelection } from './utils';

export function toGraphQLDoctrineFilter(configuration: NaturalSearchConfiguration, selections: NaturalSearchSelections): Filter {

    const result: Filter = {joins: {}, conditions: [{fields: {}}]};
    const fields: FilterConditionFields = result.conditions[0].fields;
    const joins: FilterJoins = result.joins;

    for (const groupSelections of selections) {
        for (const selection of groupSelections) {
            const transformedSelection = transformSelection(configuration, selection);
            const field = transformedSelection.field;
            const value = transformedSelection.condition;

            applyJoinAndCondition(joins, fields, field, value);
        }
    }

    return result;
}

function applyJoinAndCondition(joins: FilterJoins, fields: FilterConditionFields, field: string, condition: FilterConditionField): void {

    // Apply join, then apply operator on that join, if field name has a '.'
    const parts = field.split('.');
    if (parts.length > 1) {
        joins[parts[0]] = {filter: {conditions: [{fields: {}}]}};
        fields = joins[parts[0]].filter.conditions[0].fields;
        field = parts[1];
    }

    applyCondition(fields, field, condition);
}

function applyCondition(fields: FilterConditionFields, field: string, condition: FilterConditionField): void {

    // We assume a custom operator "search"
    if (field === 'search') {
        fields.custom = {search: {value: condition.like.value}} as any;
    } else if (condition.between && field.match('-')) {

        // split the "between" on two different fields to be able to filter intersecting ranges
        const [field1, field2] = field.split('-');
        fields[field1] = {greaterOrEqual: {value: condition.between.from}};
        fields[field2] = {lessOrEqual: {value: condition.between.to}};
    } else {
        fields[field] = condition;
    }
}

function transformSelection(configuration: NaturalSearchConfiguration, selection: Selection): Selection {
    const config = getConfigurationFromSelection(configuration, selection);

    return config && config.transform ? config.transform(selection) : selection;
}
