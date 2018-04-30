export interface TypeSelectConfiguration {
    items: any[];
    multiple?: boolean;
    displayValue?: (item: any) => string;
    matchItems?: (a: any, b: any) => string;
}

