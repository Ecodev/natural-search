import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NaturalSearchComponent } from '../../src/natural-search-module/natural-search/natural-search.component';

@NgModule({
    declarations: [
        AppComponent,
        NaturalSearchComponent,
    ],
    imports: [
        BrowserModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
