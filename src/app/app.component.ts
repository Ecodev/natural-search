import { Component, HostBinding, OnInit } from '@angular/core';
import { ThemeService } from './shared/services/theme.service';
import { OverlayContainer } from '@angular/cdk/overlay';

import {
    NaturalSearchConfiguration,
    NaturalSearchSelections,
    TypeNumericComponent,
    TypeNumericRangeComponent,
    TypeSelectComponent,
    TypeDateRangeComponent,
    toGraphQLDoctrineFilter,
    toUrl,

} from '@ecodev/natural-search';
import { Filter } from '../../projects/natural-search/src/lib/classes/graphql-doctrine.types';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

    @HostBinding('class') public theme = '';

    public config1: NaturalSearchConfiguration = [
        {
            display: 'Date range',
            field: 'date',
            component: TypeDateRangeComponent,
        },
        {
            display: 'Artist',
            field: 'artist.name',
        },
        {
            display: 'Number',
            field: 'number',
            component: TypeNumericComponent,
        },
        {
            display: 'Numeric range',
            field: 'range',
            component: TypeNumericRangeComponent,
        },
        {
            display: 'Select single',
            field: 'single',
            component: TypeSelectComponent,
            configuration: {
                items: [
                    {
                        id: 1,
                        name: 'Option A',
                    },
                    {
                        id: 2,
                        name: 'Option B',
                    },
                    {
                        id: 3,
                        name: 'Option C',
                    },
                ],
                multiple: false,
            },
        },
        {
            display: 'Select multiple',
            field: 'multiple',
            component: TypeSelectComponent,
            configuration: {
                items: [
                    {
                        id: 1,
                        name: 'Option A',
                    },
                    {
                        id: 2,
                        name: 'Option B',
                    },
                    {
                        id: 3,
                        name: 'Option C',
                    },
                ],
                multiple: true,
            },
        },
        {
            display: 'Select 2s delayed',
            field: 'delayed',
            component: TypeSelectComponent,
            configuration: {
                items: timer(2000).pipe(map(() => [
                        {
                            id: 1,
                            name: 'Option A',
                        },
                        {
                            id: 2,
                            name: 'Option B',
                        },
                        {
                            id: 3,
                            name: 'Option C',
                        },
                    ],
                )),
                multiple: true,
            },
        },
        {
            display: 'With archives',
            field: 'archived',
            condition: {
                equal: {value: true},
            },
        },
    ];

    public config: NaturalSearchConfiguration | null = this.config1;

    public config2: NaturalSearchConfiguration = [
        {
            display: 'Number',
            field: 'number',
            component: TypeNumericComponent,
            configuration: {
                max: 100,
            },
        },
        {
            display: 'With archives',
            field: 'archived',
            condition: {
                equal: {value: true},
            },
        },
    ];

    public graphqlSelections: Filter;
    public selections: NaturalSearchSelections = [
        [
            {
                field: 'delayed',
                condition: {
                    in: {values: [1]},
                },
            },
            {
                field: 'single',
                condition: {
                    in: {values: [2]},
                },
            },
            {
                field: 'artist.name',
                condition: {
                    like: {value: 'picasso'},
                },
            },
            {
                field: 'number',
                condition: {
                    equal: {value: 123},
                },
            },
            {
                field: 'archived',
                condition: {
                    equal: {value: 'true'},
                },
            },
            {
                field: 'unsued',
                condition: {
                    equal: {value: 'unused value'},
                },
            },
            {
                field: 'search',
                condition: {
                    like: {value: 'searched'},
                },
            },
        ],
    ];

    constructor(public themeService: ThemeService, private overlayContainer: OverlayContainer) {
    }

    public ngOnInit(): void {
        this.themeService.theme.subscribe(newTheme => {
            this.overlayContainer.getContainerElement().classList.remove('default');
            this.overlayContainer.getContainerElement().classList.remove('defaultDark');
            this.overlayContainer.getContainerElement().classList.add(newTheme);
            this.theme = newTheme;
        });
    }

    public updateFilter(selections: NaturalSearchSelections): void {
        this.graphqlSelections = toGraphQLDoctrineFilter(this.config, selections);
    }

    public stringify(s): string {
        return JSON.stringify(s);
    }

    public toUrl(s): string | null {
        return toUrl(s);
    }
}
