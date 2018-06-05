// Basic, loosely typed structure for graphql-doctrine filters

export interface Filter {
    joins?: FilterJoins,
    conditions?: Array<FilterCondition>,
}

export interface FilterJoins {
    [key: string]: JoinOn;
}

export interface JoinOn {
    type?: JoinType,
    filter?: Filter,
}

// Join types to be used in DQL
export enum JoinType {
    innerJoin = 'innerJoin',
    leftJoin = 'leftJoin',
}

export interface FilterCondition {
    // The logic operator to be used to append this condition
    conditionLogic?: LogicalOperator | null,
    // The logic operator to be used within all fields below
    fieldsLogic?: LogicalOperator | null,
    // Fields on which we want to apply a condition
    fields?: FilterConditionFields | null,
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
    between?: BetweenOperator | null,
    equal?: EqualOperator | null,
    greater?: GreaterOperator | null,
    greaterOrEqual?: GreaterOrEqualOperator | null,
    in?: InOperator | null,
    less?: LessOperator | null,
    lessOrEqual?: LessOrEqualOperator | null,
    like?: LikeOperator | null,
    null?: NullOperator | null,
}

type Scalar = number | string | boolean;

export interface BetweenOperator {
    from: Scalar,
    to: Scalar,
    not?: boolean | null,
}

export interface EqualOperator {
    value: Scalar,
    not?: boolean | null,
}

export interface GreaterOperator {
    value: Scalar,
    not?: boolean | null,
}

export interface GreaterOrEqualOperator {
    value: Scalar,
    not?: boolean | null,
}

export interface InOperator {
    values: Array<Scalar>,
    not?: boolean | null,
}

export interface LessOperator {
    value: Scalar,
    not?: boolean | null,
}

export interface LessOrEqualOperator {
    value: Scalar,
    not?: boolean | null,
}

export interface LikeOperator {
    value: Scalar,
    not?: boolean | null,
}

export interface NullOperator {
    not?: boolean | null,
}

