import { NaturalSearchDropdownResult } from './Values';
import { NaturalSearchDropdownConfiguration } from './Configuration';

export interface NaturalSearchDropdownComponent {

    /**
     * Set value for component initialisation purposes
     */
    init(value: NaturalSearchDropdownResult['value'], configuration?: NaturalSearchDropdownConfiguration['configuration']): void;

    /**
     * Get value, including rich object types
     */
    getValue(): NaturalSearchDropdownResult;

    /**
     * Return current value as string
     */
    getRenderedValue(): string;

    /**
     * Returns true if dropdown value is valid
     */
    isValid(): boolean;

}
