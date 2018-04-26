import { Component, HostBinding, OnInit } from '@angular/core';
import { ThemeService } from './shared/services/theme.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { TypeNumericComponent } from '@ecodev/natural-search';
import { NaturalSearchValues } from '../../lib/types/Values';
import { NaturalSearchConfiguration } from '../../lib/types/Configuration';

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
    ];

    public values: NaturalSearchValues = [
        [
            {
                attribute: 'numeric',
                value: 123,
            },
            {
                attribute: 'numeric0',
                value: 234,
            },
            {
                attribute: 'numeric0-100',
                value: 234,
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
