import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NaturalDropdownComponent } from './dropdown/dropdown.component';
import { NaturalSearchComponent } from './search/search.component';
import { NaturalInputComponent } from './input/input.component';
export * from './natural-search/natural-search.component';

@NgModule({
    declarations: [
        NaturalSearchComponent,
        NaturalInputComponent,
        NaturalDropdownComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        FlexLayoutModule,
        MatRippleModule
    ],
    exports: [
        NaturalSearchComponent,
    ],
})
export class NaturalSearchModule {
}
