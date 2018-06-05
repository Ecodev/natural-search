import { DropdownConfiguration } from './Configuration';

export interface DropdownComponent<T> {

    /**
     * Set value for component initialisation purposes
     */
    init(value: T, configuration?: DropdownConfiguration['configuration']): void;

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
