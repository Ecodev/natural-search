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
            display: 'Numeric 1',
            attribute: 'numeric1',
            component: TypeNumericComponent,
        },
        {
            display: 'Numeric 2',
            attribute: 'numeric2',
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
                attribute: 'numeric1',
                value: 123,
            },
            {
                attribute: 'numeric2',
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
