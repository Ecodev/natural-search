import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NaturalSearchModule } from '@ecodev/natural-search';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatListModule, MatSidenavModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ThemeService } from './shared/services/theme.service';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NaturalSearchModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
    ],
    providers: [ThemeService],
    bootstrap: [AppComponent],
})
export class AppModule {
}
