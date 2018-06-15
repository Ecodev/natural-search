import { NaturalSearchSelections } from '../types/Values';
import { fromUrl, toUrl } from './url';

describe('url', () => {

    it('should transform to URL back and forth', () => {
        const input: NaturalSearchSelections = [
            [
                {
                    field: 'visibility',
                    condition: {
                        in: {
                            values: [
                                'private',
                                'member',
                            ],
                        },
                    },
                },
            ],
        ];

        const url = toUrl(input);
        expect(typeof url).toBe('string');

        // Original selection should not have been modified
        expect(input[0][0].field).toBe('visibility');

        const back = fromUrl(url);
        expect(back).toEqual(input);
    });

});
