import { Filter } from './graphql-doctrine.types';
import { toGraphQLDoctrineFilter } from './graphql-doctrine.service';
import { NaturalSearchConfiguration } from '../types/Configuration';
import { TypeNumericRangeComponent } from '../dropdown-components/type-numeric-range/type-numeric-range.component';
import { TypeSelectComponent } from '../dropdown-components/type-select/type-select.component';
import { NaturalSearchSelections, Selection } from '../types/Values';

function yearToJulian(year: number, endOfYear: boolean): number {
    const date = new Date(year, endOfYear ? 11 : 0, endOfYear ? 31 : 1);

    return Math.trunc(date.getTime() / 86400000 + 2440587.5);
}

describe('NaturalFilterService', () => {

    const configuration: NaturalSearchConfiguration = [
        {
            display: 'Institution',
            field: 'locality.name',
        },
        {
            display: 'Datation',
            field: 'datings.from-to',
            component: TypeNumericRangeComponent,
            transform: (s: Selection): Selection => {
                s.condition.between.from = yearToJulian(s.condition.between.from as number, false);
                s.condition.between.to = yearToJulian(s.condition.between.to as number, true);

                return s;
            },
        },
        {
            display: 'Datation pour les geeks en Julian',
            field: 'datings.from-to',
            component: TypeNumericRangeComponent,
            configuration: {},
        },
        {
            display: 'Artiste',
            field: 'artists.name',
        },
        {
            display: 'Institution',
            field: 'institution.name',
        },
        {
            display: 'Visibilité',
            field: 'visibility',
            component: TypeSelectComponent,
            configuration: {
                items: [
                    {
                        value: 'private',
                        text: 'par moi',
                        color: null,
                    },
                    {
                        value: 'member',
                        text: 'par les membres',
                        color: 'accent',
                    },
                    {
                        value: 'public',
                        text: 'par tout le monde',
                        color: 'primary',
                    },
                ],
                multiple: true,
            },
        },
    ];

    const input: NaturalSearchSelections = [
        [
            {
                field: 'search',
                condition: {
                    like: {
                        value: 'foo',
                    },
                },
            },
            {
                field: 'artists.name',
                condition: {
                    like: {
                        value: 'bar',
                    },
                },
            },
            {
                field: 'datings.from-to',
                condition: {
                    between: {
                        from: 1900,
                        to: 2000,
                    },
                },
            },
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

    const expected: Filter = {
        joins: {
            artists: {
                filter: {
                    conditions: [{
                        fields: {
                            name: {like: {value: 'bar'}},
                        },
                    }],
                },
            },
            datings: {
                filter: {
                    conditions: [{
                        fields: {
                            from: {greaterOrEqual: {value: 2415020}},
                            to: {lessOrEqual: {value: 2451909}},
                        },
                    }],
                },
            },
        },
        conditions: [{
            fields: {
                custom: ({search: {value: 'foo'}}) as any,
                visibility: {in: {values: ['private', 'member']}},
            },
        }],
    };

    it('should transform correctly', () => {
        expect(toGraphQLDoctrineFilter(configuration, input)).toEqual(expected as any);
    });
});
