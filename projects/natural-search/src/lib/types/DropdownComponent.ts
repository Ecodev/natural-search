import { DropdownConfiguration } from './Configuration';
import { FilterConditionField } from '../classes/graphql-doctrine.types';

export interface DropdownComponent {

    /**
     * Set condition for component initialisation purposes
     */
    init(condition: FilterConditionField, configuration?: DropdownConfiguration['configuration']): void;

    /**
     * Get condition, including rich object types
     */
    getCondition(): FilterConditionField;

    /**
     * Return current value as string
     */
    getRenderedValue(): string;

    /**
     * Returns true if dropdown value is valid
     */
    isValid(): boolean;

}
