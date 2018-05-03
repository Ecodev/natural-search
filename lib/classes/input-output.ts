import { NaturalSearchConfiguration, NaturalSearchItemConfiguration } from '../types/Configuration';
import { NaturalSearchValue } from '../types/Values';

export class InputOutput {

    constructor() {
    }

    public static getConfigurationFromValue(configuration: NaturalSearchConfiguration,
                                            value: NaturalSearchValue): NaturalSearchItemConfiguration {

        for (const c of configuration) {
            if (c.attribute === value.attribute) {
                return c;
            }
        }

        return null;
    }

}
