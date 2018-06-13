import { isString } from 'lodash';
import { NaturalSearchConfiguration } from '../types/Configuration';
import { NaturalSearchSelections, Selection } from '../types/Values';
import {
    Filter, FilterCondition,
    FilterConditionField,
    FilterConditionFields,
    FilterJoins,
    LogicalOperator,
} from './graphql-doctrine.types';
import { getConfigurationFromSelection } from './utils';
import { deepClone } from './utils';

export function toGraphQLDoctrineFilter(configuration: NaturalSearchConfiguration, selections: NaturalSearchSelections): Filter {

    const result: Filter = {};
    const joins: FilterJoins = {};

    for (const groupSelections of selections) {
        const fields: FilterConditionFields[] = [];
        for (const selection of groupSelections) {
            const transformedSelection = transformSelection(configuration, selection);
            const field = transformedSelection.field;
            const value = transformedSelection.condition;

            applyJoinAndCondition(joins, fields, field, value);
        }
        addFieldsToFilter(result, fields);
    }

    if (Object.keys(joins).length) {
        result.joins = joins;
    }

    return result;
}

function addFieldsToFilter(filter: Filter, fields: FilterConditionFields[]): void {
    if (!fields.length) {
        return;
    }

    if (!filter.conditions) {
        filter.conditions = [];
    }

    const condition: FilterCondition = {
        fields: fields,
    };

    if (filter.conditions.length > 0) {
        condition.conditionLogic = LogicalOperator.OR;
    }

    filter.conditions.push(condition);
}

function applyJoinAndCondition(joins: FilterJoins, fields: FilterConditionFields[], field: string, condition: FilterConditionField): void {

    // Apply join, then apply operator on that join, if field name has a '.'
    const [joinedRelation, joinedField] = field.split('.');
    if (joinedField) {
        const joinedFields: FilterConditionFields[] = [];

        if (!joins[joinedRelation]) {
            joins[joinedRelation] = {filter: {}};
        }
        const joinedFilter: Filter = joins[joinedRelation].filter;

        joinedFields.push(applyCondition(joinedField, condition));
        addFieldsToFilter(joinedFilter, joinedFields);
    } else {
        fields.push(applyCondition(field, condition));
    }
}

function applyCondition(field: string, condition: FilterConditionField): FilterConditionFields {
    const result: FilterConditionFields = {};

    // We assume a custom operator "search"
    if (field === 'search') {
        return {custom: {search: {value: condition.like.value}}} as FilterConditionFields;
    } else if (condition.between && field.match('-')) {

        // split the "between" on two different fields to be able to filter intersecting ranges
        const [field1, field2] = field.split('-');
        result[field1] = {greaterOrEqual: {value: condition.between.from}};
        result[field2] = {lessOrEqual: {value: condition.between.to}};
    } else {
        result[field] = condition;
    }

    return result;
}

function transformSelection(configuration: NaturalSearchConfiguration, selection: Selection): Selection {
    const config = getConfigurationFromSelection(configuration, selection);

    return config && config.transform ? config.transform(deepClone(selection)) : selection;
}
