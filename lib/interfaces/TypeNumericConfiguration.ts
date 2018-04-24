export interface TypeNumericConfiguration {
    min?: number;
    max?: number;
    step?: null;
}

export interface  TypeRangeConfiguration extends TypeNumericConfiguration {
    minRequired: boolean;
    maxRequired: boolean;
}
