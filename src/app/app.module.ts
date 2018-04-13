import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NaturalSearchComponent} from './modules/natural-search/natural-search/natural-search.component';


@NgModule({
    declarations: [
        AppComponent,
        NaturalSearchComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
