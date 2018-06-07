import { Filter } from './graphql-doctrine.types';
import { toGraphQLDoctrineFilter } from './graphql-doctrine';
import { NaturalSearchConfiguration } from '../types/Configuration';
import { NaturalSearchSelections, Selection } from '../types/Values';

function yearToJulian(year: number, endOfYear: boolean): number {
    const date = new Date(year, endOfYear ? 11 : 0, endOfYear ? 31 : 1);

    return Math.trunc(date.getTime() / 86400000 + 2440587.5);
}

describe('toGraphQLDoctrineFilter', () => {

    const configuration: NaturalSearchConfiguration = [
        {
            display: 'Datation',
            field: 'datings.from-to',
            transform: (s: Selection): Selection => {
                s.condition.between.from = yearToJulian(s.condition.between.from as number, false);
                s.condition.between.to = yearToJulian(s.condition.between.to as number, true);

                return s;
            },
        },
        {
            display: 'Name',
            field: 'name',
            transform: (s: Selection): Selection => {
                s.condition.like.value = '%' + s.condition.like.value + '%';

                return s;
            },
        },
    ];

    it('should do simple thing', () => {
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

        const expected: Filter = {
            conditions: [{
                fields: {
                    visibility: {in: {values: ['private', 'member']}},
                },
            }],
        };

        expect(toGraphQLDoctrineFilter(configuration, input)).toEqual(expected as any);
    });

    it('should transform value', () => {
        const input: NaturalSearchSelections = [
            [
                {
                    field: 'name',
                    condition: {
                        like: {
                            value: 'foo',
                        },
                    },
                },
            ],
        ];

        const expected: Filter = {
            conditions: [{
                fields: {
                    name: {like: {value: '%foo%'}},
                },
            }],
        };

        expect(toGraphQLDoctrineFilter(configuration, input)).toEqual(expected as any);
    });

    it('should handle search with custom operator', () => {
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
            ],
        ];

        const expected: Filter = {
            conditions: [{
                fields: {
                    custom: ({search: {value: 'foo'}}) as any,
                },
            }],
        };

        expect(toGraphQLDoctrineFilter(configuration, input)).toEqual(expected as any);
    });

    it('should join a relation', () => {
        const input: NaturalSearchSelections = [
            [
                {
                    field: 'artists.name',
                    condition: {
                        like: {
                            value: 'bar',
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
            },
        };

        expect(toGraphQLDoctrineFilter(configuration, input)).toEqual(expected as any);
    });

    it('should use `between` on single field', () => {
        const input: NaturalSearchSelections = [
            [
                {
                    field: 'year',
                    condition: {
                        between: {
                            from: 1900,
                            to: 2000,
                        },
                    },
                },
            ],
        ];

        const expected: Filter = {
            conditions: [{
                fields: {
                    year: {between: {from: 1900, to: 2000}},
                },
            }],
        };

        expect(toGraphQLDoctrineFilter(configuration, input)).toEqual(expected as any);
    });

    it('should use `between` on two fields', () => {
        const input: NaturalSearchSelections = [
            [
                {
                    field: 'field1-field2',
                    condition: {
                        between: {
                            from: 1900,
                            to: 2000,
                        },
                    },
                },
            ],
        ];

        const expected: Filter = {
            conditions: [{
                fields: {
                    field1: {greaterOrEqual: {value: 1900}},
                    field2: {lessOrEqual: {value: 2000}},
                },
            }],
        };

        expect(toGraphQLDoctrineFilter(configuration, input)).toEqual(expected as any);
    });

    it('should use `between` on two fields and transform', () => {
        const input: NaturalSearchSelections = [
            [
                {
                    field: 'datings.from-to',
                    condition: {
                        between: {
                            from: 1900,
                            to: 2000,
                        },
                    },
                },
            ],
        ];

        const expected: Filter = {
            joins: {
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
        };

        expect(toGraphQLDoctrineFilter(configuration, input)).toEqual(expected as any);
    });
});
