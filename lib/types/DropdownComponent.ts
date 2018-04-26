export interface NaturalSearchDropdownComponent {

    /**
     * Set the custom configuration for the type
     * such as data source for possible values, display
     * function for a value, etc.
     */
    setConfiguration(configuration: any): void;

    /**
     * Set value for component initialisation purposes
     */
    initValue(value: any): void;

    /**
     * Get value, including rich object types
     */
    getValue(): any;

    /**
     * Return actual value as string
     */
    getRenderedValue(): string;

}
