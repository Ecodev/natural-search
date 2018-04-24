import { Component, HostBinding, OnInit } from '@angular/core';
import { ThemeService } from './shared/services/theme.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { TestinputComponent } from './testinput/testinput.component';
import { MatDialog } from '@angular/material';
import { TypeNumericComponent } from '@ecodev/natural-search';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

    @HostBinding('class') public theme = '';

    public searchConfig;

    constructor(public themeService: ThemeService, private overlayContainer: OverlayContainer, private dialog: MatDialog) {
    }

    public ngOnInit() {

        this.searchConfig = [
            {
                display: 'Test1',
                attribute: 'test1',
                component: TestinputComponent,
            },
            {
                display: 'Test2',
                attribute: 'test2',
                component: TypeNumericComponent,
            },
        ];

        this.themeService.theme.subscribe(newTheme => {
            this.overlayContainer.getContainerElement().classList.remove('default');
            this.overlayContainer.getContainerElement().classList.remove('defaultDark');
            this.overlayContainer.getContainerElement().classList.add(newTheme);
            this.theme = newTheme;
        });
    }

    public openModal() {
        this.dialog.open(TestinputComponent);
    }
}
