import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
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
import { ConfigurationSelectorComponent } from './dropdown-components/configuration-selector/configuration-selector.component';
import { NaturalDropdownService } from './dropdown-container/dropdown.service';
import { GroupComponent } from './group/group.component';
import { TypeSelectComponent } from './dropdown-components/type-select/type-select.component';

export * from './types/Configuration';
export * from './types/DropdownComponent';
export * from './dropdown-components/type-numeric/TypeNumericConfiguration';
export * from './dropdown-components/type-select/TypeSelectConfiguration';

export { TypeNumericComponent };
export { TypeSelectComponent };

@NgModule({
    declarations: [
        NaturalSearchComponent,
        NaturalInputComponent,
        NaturalDropdownContainerComponent,
        TypeNumericComponent,
        ConfigurationSelectorComponent,
        GroupComponent,
        TypeSelectComponent,
    ],
    entryComponents: [
        NaturalDropdownContainerComponent,
        ConfigurationSelectorComponent,
        TypeNumericComponent,
        TypeSelectComponent,
    ],
    exports: [
        NaturalDropdownContainerComponent,
        NaturalSearchComponent,
        TypeNumericComponent,
        TypeSelectComponent,
    ],
    providers: [
        NaturalDropdownService,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        FlexLayoutModule,
        MatRippleModule,
        PortalModule,
        OverlayModule,
        MatDialogModule,
        MatListModule,
    ],
})
export class NaturalSearchModule {
}
