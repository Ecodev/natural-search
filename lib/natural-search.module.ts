import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NaturalSearchComponent } from './natural-search/natural-search.component';
import { NaturalInputComponent } from './natural-input/natural-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
export * from './natural-search/natural-search.component';

@NgModule({
    declarations: [
        NaturalSearchComponent,
        NaturalInputComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule
    ],
    exports: [
        NaturalSearchComponent,
    ],
})
export class NaturalSearchModule {
}
