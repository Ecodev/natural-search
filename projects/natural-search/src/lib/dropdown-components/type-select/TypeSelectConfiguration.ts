export interface TypeSelectConfiguration {
    items: any[];
    multiple?: boolean;
    displayWith?: (item: any) => string;
    matchItems?: (a: any, b: any) => string;
}

