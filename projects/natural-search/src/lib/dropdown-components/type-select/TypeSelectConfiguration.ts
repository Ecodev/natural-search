import { Scalar } from '../../classes/graphql-doctrine.types';

export type TypeSelectItem = Scalar | {
    id: Scalar;
    value: Scalar;
    name: Scalar;
};

export interface TypeSelectConfiguration {
    items: TypeSelectItem[];
    multiple?: boolean;
}

