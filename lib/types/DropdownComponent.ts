import { NaturalSearchDropdownResult } from './Values';
import { NaturalSearchItemConfiguration } from '@ecodev/natural-search';

export interface NaturalSearchDropdownComponent {

    /**
     * Set value for component initialisation purposes
     */
    init(value: NaturalSearchDropdownResult['value'], configuration?: NaturalSearchItemConfiguration['configuration']): void;

    /**
     * Get value, including rich object types
     */
    getValue(): NaturalSearchDropdownResult;

    /**
     * Return actual value as string
     */
    getRenderedValue(): string;

    /**
     * Returns true if dropdown value is valid
     */
    isValid(): boolean;

}
