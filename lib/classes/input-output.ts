import { NaturalSearchConfiguration, NaturalSearchItemConfiguration } from '../types/Configuration';
import { NaturalSearchGroupValues, NaturalSearchValue } from '../types/Values';

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

    /**
     * Modify
     * @param {NaturalSearchConfiguration} configuration
     * @param {NaturalSearchGroupValues} values
     * @returns {boolean}
     */
    public static cleanValuesWithoutConfig(configuration: NaturalSearchConfiguration, values: NaturalSearchGroupValues) {

        if (!configuration) {
            return [];
        }

        let hasChanged = false;
        const configurationKeys = configuration.map(c => c.attribute);
        for (let i = values.length; i < 0; i--) {
            const indexOfConfig = configurationKeys.indexOf(values[i].attribute);
            if (indexOfConfig < 0) {
                values.splice(i, 1);
                hasChanged = true;
            }
        }

        return values;
    }
}
