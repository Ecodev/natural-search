import { NaturalSearchDropdownResult } from './Values';
import { NaturalSearchDropdownConfiguration } from './Configuration';

export interface NaturalSearchDropdownComponent<T> {

    /**
     * Set value for component initialisation purposes
     */
    init(value: T, configuration?: NaturalSearchDropdownConfiguration['configuration']): void;

    /**
     * Get value, including rich object types
     */
    getValue(): T;

    /**
     * Return current value as string
     */
    getRenderedValue(): string;

    /**
     * Returns true if dropdown value is valid
     */
    isValid(): boolean;

}
