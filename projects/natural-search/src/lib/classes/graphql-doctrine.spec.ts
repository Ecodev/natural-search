import { Filter, LogicalOperator } from './graphql-doctrine.types';
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
            field: 'datings.julianDay',
            transform: (s: Selection): Selection => {
                if (s.condition.between) {
                    s.condition.between.from = yearToJulian(s.condition.between.from as number, false);
                    s.condition.between.to = yearToJulian(s.condition.between.to as number, true);
                }

                return s;
            },
        },
        {
            display: 'Name',
            field: 'name',
            transform: (s: Selection): Selection => {
                if (s.condition.like) {
                    s.condition.like.value = '%' + s.condition.like.value + '%';
                }

                return s;
            },
        },
    ];

    it('should return empty output for null', () => {
        expect(toGraphQLDoctrineFilter(configuration, null)).toEqual({});
    });

    it('should return empty output for empty selection', () => {
        expect(toGraphQLDoctrineFilter(configuration, [])).toEqual({});
    });

    it('should return empty output for empty group', () => {
        expect(toGraphQLDoctrineFilter(configuration, [[]])).toEqual({});
    });

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
            groups: [{
                conditions: [{
                    visibility: {in: {values: ['private', 'member']}},
                }],
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
            groups: [{
                conditions: [{
                    name: {like: {value: '%foo%'}},
                }],
            }],
        };

        expect(toGraphQLDoctrineFilter(configuration, input)).toEqual(expected as any);

        // Original value must not have been touched
        expect((input as any)[0][0].condition.like.value).toEqual('foo');
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
            groups: [{
                conditions: [{
                    custom: ({search: {value: 'foo'}}) as any,
                }],
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
            groups: [
                {
                    joins: {
                        artists: {
                            conditions: [{
                                name: {like: {value: 'bar'}},
                            }],
                        },
                    },
                },
            ],
        };

        expect(toGraphQLDoctrineFilter(configuration, input)).toEqual(expected as any);
    });

    it('should use `between` without transform', () => {
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
            groups: [{
                conditions: [{
                    year: {between: {from: 1900, to: 2000}},
                }],
            }],
        };

        expect(toGraphQLDoctrineFilter(configuration, input)).toEqual(expected as any);
    });

    it('should use `between` with transform', () => {
        const input: NaturalSearchSelections = [
            [
                {
                    field: 'datings.julianDay',
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
            groups: [
                {
                    joins: {
                        datings: {
                            conditions: [{
                                julianDay: {between: {from: 2415020, to: 2451909}},
                            }],
                        },
                    },
                },
            ],
        };

        expect(toGraphQLDoctrineFilter(configuration, input)).toEqual(expected as any);
    });

    it('should concat same field in the same array of fields', () => {
        const input: NaturalSearchSelections = [
            [
                {
                    field: 'name',
                    condition: {like: {value: 'foo'}},
                },
                {
                    field: 'name',
                    condition: {like: {value: 'bar'}},
                },
            ],
        ];

        const expected: Filter = {
            groups: [{
                conditions: [
                    {name: {like: {value: '%foo%'}}},
                    {name: {like: {value: '%bar%'}}},
                ],
            }],
        };

        expect(toGraphQLDoctrineFilter(configuration, input)).toEqual(expected as any);
    });

    it('should merge unique joins', () => {
        const input: NaturalSearchSelections = [
            [
                {
                    field: 'artists.name',
                    condition: {like: {value: 'John'}},
                },
                {
                    field: 'artists.name',
                    condition: {like: {value: 'Jane'}},
                },
            ],
            [
                {
                    field: 'artists.name',
                    condition: {like: {value: 'Jake'}},
                },
                {
                    field: 'city.name',
                    condition: {like: {value: 'New York'}},
                },
                {
                    field: 'name',
                    condition: {like: {value: 'foo'}},
                },
                {
                    field: 'name',
                    condition: {like: {value: 'bar'}},
                },
            ],
        ];

        const expected = {
            groups: [
                {
                    joins: {
                        artists: {
                            conditions: [
                                {name: {like: {value: 'John'}}},
                                {name: {like: {value: 'Jane'}}},
                            ],
                        },
                    },
                },
                {
                    groupLogic: 'OR',
                    joins: {
                        artists: {
                            conditions: [
                                {name: {like: {value: 'Jake'}}},
                            ],
                        },
                        city: {
                            conditions: [
                                {name: {like: {value: 'New York'}}},
                            ],
                        },
                    },
                    conditions: [
                        {name: {like: {value: '%foo%'}}},
                        {name: {like: {value: '%bar%'}}},
                    ],
                },
            ],
        };

        expect(toGraphQLDoctrineFilter(configuration, input)).toEqual(expected as any);
    });

    it('should group with OR', () => {
        const input: NaturalSearchSelections = [
            [
                {
                    field: 'name',
                    condition: {like: {value: 'foo'}},
                },
            ],
            [
                {
                    field: 'name',
                    condition: {like: {value: 'bar'}},
                },
            ],
        ];

        const expected: Filter = {
            groups: [
                {
                    conditions: [
                        {name: {like: {value: '%foo%'}}},
                    ],
                },
                {
                    groupLogic: LogicalOperator.OR,
                    conditions: [
                        {name: {like: {value: '%bar%'}}},
                    ],
                },
            ],
        };

        expect(toGraphQLDoctrineFilter(configuration, input)).toEqual(expected as any);
    });
});
