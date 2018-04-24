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
import { NaturalSearchComponent } from './search/search.component';
import { NaturalInputComponent } from './input/input.component';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { NaturalDropdownContainerComponent } from './dropdown-container/dropdown-container.component';

@NgModule({
    declarations: [
        NaturalSearchComponent,
        NaturalInputComponent,
        NaturalDropdownContainerComponent,
    ],
    entryComponents: [
        NaturalDropdownContainerComponent,
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
        MatRippleModule,
        PortalModule,
        OverlayModule,
    ],
    exports: [
        NaturalSearchComponent,
    ],
})
export class NaturalSearchModule {
}
