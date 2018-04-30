import { Component, HostBinding, OnInit } from '@angular/core';
import { ThemeService } from './shared/services/theme.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { TypeNumericComponent } from '@ecodev/natural-search';
import { NaturalSearchValues } from '../../lib/types/Values';
import { NaturalSearchConfiguration } from '../../lib/types/Configuration';
import { TypeSelectComponent } from '../../lib/dropdown-components/type-select/type-select.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

    @HostBinding('class') public theme = '';

    public config: NaturalSearchConfiguration = [
        {
            display: 'Number',
            attribute: 'numeric',
            component: TypeNumericComponent,
        },
        {
            display: 'Number > 0',
            attribute: 'numeric0',
            component: TypeNumericComponent,
            configuration: {
                min: 0,
            },
        },
        {
            display: 'Number < 100',
            attribute: 'numeric100',
            component: TypeNumericComponent,
            configuration: {
                max: 100,
            },
        },
        {
            display: 'Number 0 < < 100',
            attribute: 'numeric0-100',
            component: TypeNumericComponent,
            configuration: {
                min: 0,
                max: 100,
            },
        },
        {
            display: 'Select single',
            attribute: 'select-single',
            component: TypeSelectComponent,
            configuration: {
                items: [
                    {
                        id: 1,
                        name: 'Object 1',
                    },
                    {
                        id: 2,
                        name: 'Object 2',
                    },
                    {
                        id: 3,
                        name: 'Object 3',
                    },
                ],
                multiple: false,
            },
        },
        {
            display: 'Select multiple',
            attribute: 'select-multiple',
            component: TypeSelectComponent,
            configuration: {
                items: [
                    {
                        id: 1,
                        name: 'Object 1',
                    },
                    {
                        id: 2,
                        name: 'Object 2',
                    },
                    {
                        id: 3,
                        name: 'Object 3',
                    },
                ],
                multiple: true,
                displayName: (item) => item.name,
                matchItems: (a, b) => a.id === b.id,
            },
        },
    ];

    public values: NaturalSearchValues = [
        [
            {
                attribute: 'numeric0-100',
                value: 345,
            },
            {
                attribute: 'search',
                value: 'free seach',
            },
            {
                'attribute': 'select-multiple',
                'value': [
                    {
                        'id': 2,
                        'name': 'Object 2',
                    },
                    {
                        'id': 3,
                        'name': 'Object 3',
                    },
                ],
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

}
