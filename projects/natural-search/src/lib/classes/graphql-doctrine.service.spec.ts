import { TestBed, inject } from '@angular/core/testing';
import { Filter, GraphQLDoctrineService } from './graphql-doctrine.service';
import { NaturalSearchConfiguration } from '../types/Configuration';
import { TypeNumericRangeComponent } from '../dropdown-components/type-numeric-range/type-numeric-range.component';
import { TypeNumericComponent } from '../dropdown-components/type-numeric/type-numeric.component';
import { TypeSelectComponent } from '../dropdown-components/type-select/type-select.component';
import { NaturalSearchSelections } from '../types/Values';

function yearToJulian(year: number, endOfYear: boolean): number {
    const date = new Date(year, endOfYear ? 11 : 0, endOfYear ? 31 : 1);

    return Math.trunc(date.getTime() / 86400000 + 2440587.5);
}

describe('NaturalFilterService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GraphQLDoctrineService],
        });
    });

    const configuration: NaturalSearchConfiguration = [
        {
            display: 'Institution',
            attribute: 'locality.name',
        },
        {
            display: 'Datation',
            attribute: 'datings.from-to',
            component: TypeNumericRangeComponent,
            configuration: {
                transformValue: (v) => {
                    return {from: yearToJulian(v.from, false), to: yearToJulian(v.to, true)};
                },
            },
        },
        {
            display: 'Datation pour les geeks en Julian',
            attribute: 'datings.from-to',
            component: TypeNumericRangeComponent,
            configuration: {},
        },
        {
            display: 'Artiste',
            attribute: 'artists.name',
        },
        {
            display: 'Institution',
            attribute: 'institution.name',
        },
        {
            display: 'Visibilité',
            attribute: 'visibility',
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
                displayWith: (item) => item.text,
                matchItems: (a, b) => a.value === b.value,
            },
        },
    ];

    const input: NaturalSearchSelections = [
        [
            {
                attribute: 'search',
                value: 'foo',
            },
            {
                attribute: 'artists.name',
                value: 'bar',
            },
            {
                attribute: 'datings.from-to',
                value: {
                    from: 1900,
                    to: 2000,
                },
            },
            {
                attribute: 'visibility',
                value: [
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
                ],
            },
        ],
    ];

    const expected: Filter = {
        joins: {
            artists: {
                filter: {
                    conditions: [{
                        fields: {
                            name: {like: {value: '%bar%'}},
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

    it('should be created', inject([GraphQLDoctrineService], (service: GraphQLDoctrineService) => {
        expect(service).toBeTruthy();
    }));

    it('should be created', inject([GraphQLDoctrineService], (service: GraphQLDoctrineService) => {
        expect(service.toGraphQLDoctrineFilter(configuration, input)).toEqual(expected as any);
    }));
});
