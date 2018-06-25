import { DropdownConfiguration } from './Configuration';
import { FilterGroupConditionField } from '../classes/graphql-doctrine.types';
import { BehaviorSubject } from 'rxjs';

export interface DropdownComponent {

    /**
     * Observable of current value as string
     */
    renderedValue: BehaviorSubject<string>;

    /**
     * Set condition for component initialisation purposes
     */
    init(condition: FilterGroupConditionField, configuration?: DropdownConfiguration['configuration']): void;

    /**
     * Get condition, including rich object types
     */
    getCondition(): FilterGroupConditionField;

    /**
     * Returns true if dropdown value is valid
     */
    isValid(): boolean;

    /**
     * Returns true if the dropdown value has change
     */
    isDirty(): boolean;

}
