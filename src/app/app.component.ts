import { Component, HostBinding, OnInit } from '@angular/core';
import { ThemeService } from './shared/services/theme.service';
import { OverlayContainer } from '@angular/cdk/overlay';

import {
    NaturalSearchSelections,
    NaturalSearchConfiguration,
    TypeNumericComponent,
    TypeNumericRangeComponent,
    TypeSelectComponent, BasicConfiguration, DropdownConfiguration, FlagConfiguration,
} from '@ecodev/natural-search';
import { Filter } from '../../projects/natural-search/src/lib/classes/graphql-doctrine.types';
import { toGraphQLDoctrineFilter } from '../../projects/natural-search/src/lib/classes/graphql-doctrine.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

    @HostBinding('class') public theme = '';

    public config1: NaturalSearchConfiguration = [
        {
            display: 'Artist',
            attribute: 'artist',
        },
        {
            display: 'Range',
            attribute: 'range',
            component: TypeNumericRangeComponent,
        },
        {
            display: 'Number',
            attribute: 'number',
            component: TypeNumericComponent,
        },
        {
            display: 'Select',
            attribute: 'select',
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
                displayWith: (item) => item.name,
                matchItems: (a, b) => a.id === b.id,
            },
        },
        {
            display: 'Checkbox',
            attribute: 'checkbox',
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
                displayWith: (item) => item.name,
                matchItems: (a, b) => a.id === b.id,
            },
        },
        {
            display: 'With archives',
            attribute: 'archived',
            value: true,
        },
    ];

    public config: NaturalSearchConfiguration = this.config1;
    public output;

    public config2: NaturalSearchConfiguration = [
        {
            display: 'Number',
            attribute: 'number',
            component: TypeNumericComponent,
            configuration: {
                max: 100,
            },
        },
        {
            display: 'With archives',
            attribute: 'archived',
            value: 'true',
        },
    ];

    public graphqlSelections: Filter;
    public selections: NaturalSearchSelections = [
        [
            {
                attribute: 'artist',
                value: {
                    like: {value: 'picasso'},
                },
            },
            {
                attribute: 'number',
                value: {
                    equal: {value: 123},
                },
            },
            {
                attribute: 'archived',
                value: {
                    equal: {value: 'true'},
                },
            },
            {
                attribute: 'unsued',
                value: {
                    equal: {value: 'unused value'},
                },
            },
            {
                attribute: 'search',
                value: {
                    like: {value: 'searched'},
                },
            },
        ],
    ];

    constructor(public themeService: ThemeService, private overlayContainer: OverlayContainer) {
    }

    public ngOnInit() {
        this.themeService.theme.subscribe(newTheme => {
            this.overlayContainer.getContainerElement().classList.remove('default');
            this.overlayContainer.getContainerElement().classList.remove('defaultDark');
            this.overlayContainer.getContainerElement().classList.add(newTheme);
            this.theme = newTheme;
        });
    }

    public updateFilter(selections: NaturalSearchSelections) {
        this.graphqlSelections = toGraphQLDoctrineFilter(this.config, selections);
    }

}
