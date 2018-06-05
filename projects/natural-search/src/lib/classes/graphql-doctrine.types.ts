// Basic; loosely typed structure for graphql-doctrine filters

export interface Filter {
    joins?: FilterJoins;
    conditions?: Array<FilterCondition>;
}

export interface FilterJoins {
    [key: string]: JoinOn;
}

export interface JoinOn {
    type?: JoinType;
    filter?: Filter;
}

// Join types to be used in DQL
export enum JoinType {
    innerJoin = 'innerJoin',
    leftJoin = 'leftJoin',
}

export interface FilterCondition {
    // The logic operator to be used to append this condition
    conditionLogic?: LogicalOperator;
    // The logic operator to be used within all fields below
    fieldsLogic?: LogicalOperator;
    // Fields on which we want to apply a condition
    fields?: FilterConditionFields;
}

// Logical operator to be used in conditions
export enum LogicalOperator {
    AND = 'AND',
    OR = 'OR',
}

export interface FilterConditionFields {
    [key: string]: FilterConditionField;
}

export interface FilterConditionField {
    between?: BetweenOperator;
    equal?: EqualOperator;
    greater?: GreaterOperator;
    greaterOrEqual?: GreaterOrEqualOperator;
    in?: InOperator;
    less?: LessOperator;
    lessOrEqual?: LessOrEqualOperator;
    like?: LikeOperator;
    null?: NullOperator;

    // For relations
    have?: HaveOperator;
    empty?: EmptyOperator;
}

export type Scalar = number | string | boolean;

export interface HaveOperator {
    values: Array<string>;
    not?: boolean;
}

export interface EmptyOperator {
    not?: boolean;
}

export interface BetweenOperator {
    from: Scalar;
    to: Scalar;
    not?: boolean;
}

export interface EqualOperator {
    value: Scalar;
    not?: boolean;
}

export interface GreaterOperator {
    value: Scalar;
    not?: boolean;
}

export interface GreaterOrEqualOperator {
    value: Scalar;
    not?: boolean;
}

export interface InOperator {
    values: Array<Scalar>;
    not?: boolean;
}

export interface LessOperator {
    value: Scalar;
    not?: boolean;
}

export interface LessOrEqualOperator {
    value: Scalar;
    not?: boolean;
}

export interface LikeOperator {
    value: Scalar;
    not?: boolean;
}

export interface NullOperator {
    not?: boolean;
}

