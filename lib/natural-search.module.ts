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
import { TypeNumericComponent } from './dropdown-components/type-numeric/type-numeric.component';

export { TypeNumericComponent };

@NgModule({
    declarations: [
        NaturalSearchComponent,
        NaturalInputComponent,
        NaturalDropdownContainerComponent,
        TypeNumericComponent,
    ],
    entryComponents: [
        NaturalDropdownContainerComponent,
        TypeNumericComponent
    ],
    exports: [
        NaturalSearchComponent,
        TypeNumericComponent,
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
})
export class NaturalSearchModule {
}
