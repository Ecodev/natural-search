import { DropdownConfiguration } from './Configuration';
import { FilterGroupConditionField } from '../classes/graphql-doctrine.types';

export interface DropdownComponent {

    /**
     * Set condition for component initialisation purposes
     */
    init(condition: FilterGroupConditionField, configuration?: DropdownConfiguration['configuration']): void;

    /**
     * Get condition, including rich object types
     */
    getCondition(): FilterGroupConditionField;

    /**
     * Return current value as string
     */
    getRenderedValue(): string;

    /**
     * Returns true if dropdown value is valid
     */
    isValid(): boolean;

    /**
     * Returns true if the dropdown value has change
     */
    isDirty(): boolean;

}
