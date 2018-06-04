import { NaturalSearchConfiguration, NaturalSearchItemConfiguration } from '../types/Configuration';
import { NaturalSearchSelection } from '../types/Values';

export class InputOutput {

    constructor() {
    }

    public static getConfigurationFromValue(configuration: NaturalSearchConfiguration,
                                            value: NaturalSearchSelection): NaturalSearchItemConfiguration {

        for (const c of configuration) {
            if (c.attribute === value.attribute) {
                return c;
            }
        }

        return null;
    }

}
