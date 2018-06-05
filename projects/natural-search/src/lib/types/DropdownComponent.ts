import { DropdownConfiguration } from './Configuration';
import { FilterConditionField } from '../classes/graphql-doctrine.types';

export interface DropdownComponent {

    /**
     * Set value for component initialisation purposes
     */
    init(value: FilterConditionField, configuration?: DropdownConfiguration['configuration']): void;

    /**
     * Get value, including rich object types
     */
    getValue(): FilterConditionField;

    /**
     * Return current value as string
     */
    getRenderedValue(): string;

    /**
     * Returns true if dropdown value is valid
     */
    isValid(): boolean;

}
