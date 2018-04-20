import { Component, HostBinding, OnInit } from '@angular/core';
import { ThemeService } from './shared/services/theme.service';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

    @HostBinding('class') public theme = '';

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
