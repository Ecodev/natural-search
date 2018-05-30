import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NaturalSearchModule } from '@ecodev/natural-search';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ThemeService } from './shared/services/theme.service';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        NaturalSearchModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatDialogModule,
        MatFormFieldModule,
    ],
    providers: [
        ThemeService,
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {
}
