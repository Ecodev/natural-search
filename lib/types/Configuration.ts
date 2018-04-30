/**
 * Configuration for one item
 */
export interface NaturalSearchItemConfiguration {
    display: string;
    attribute: string;
    component?: any; // NaturalSearchDropdownComponent;
    configuration?: any;
}

/**
 * Exhaustive list of configurations
 */
export interface NaturalSearchConfiguration extends Array<NaturalSearchItemConfiguration> {
}
