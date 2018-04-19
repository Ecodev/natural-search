import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NaturalSearchComponent } from './natural-search/natural-search.component';
export * from './natural-search/natural-search.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        NaturalSearchComponent,
    ],
    exports: [
        NaturalSearchComponent,
    ],
})
export class NaturalSearchModule {
}
