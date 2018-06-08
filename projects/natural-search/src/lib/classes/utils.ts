import { ItemConfiguration, NaturalSearchConfiguration } from '../types/Configuration';
import { Selection } from '../types/Values';

export function getConfigurationFromSelection(configuration: NaturalSearchConfiguration,
                                              selection: Selection): ItemConfiguration {

    return configuration ? configuration.find(v => v.field === selection.field) : null;
}

export function deepClone(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
}
