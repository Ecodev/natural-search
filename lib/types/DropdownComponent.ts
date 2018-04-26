export interface NaturalSearchDropdownComponent {

    /**
     * Set value for component initialisation purposes
     */
    init(value: any, configuration?: any): void;

    /**
     * Get value, including rich object types
     */
    getValue(): any;

    /**
     * Return actual value as string
     */
    getRenderedValue(): string;

    /**
     * Returns true if dropdown value is valid
     */
    isValid(): boolean;

}
