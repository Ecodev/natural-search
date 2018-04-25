import { NaturalSearchConfiguration, NaturalSearchItemConfiguration } from '../types/Configuration';
import { NaturalSearchValue, NaturalSearchValues } from '../types/Values';

export class InputOutput {

    constructor() {
    }

    public static inputToOutput(configuration: NaturalSearchConfiguration, values: NaturalSearchValues) {

    }

    public static outputToInput() {

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
