import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NaturalSearchModule } from '@ecodev/natural-search';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        NaturalSearchModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
