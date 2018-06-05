import { NaturalSearchConfiguration, ItemConfiguration } from '../types/Configuration';
import { Selection } from '../types/Values';

export class InputOutput {

    constructor() {
    }

    public static getConfigurationFromValue(configuration: NaturalSearchConfiguration,
                                            value: Selection): ItemConfiguration {

        for (const c of configuration) {
            if (c.attribute === value.attribute) {
                return c;
            }
        }

        return null;
    }

}
