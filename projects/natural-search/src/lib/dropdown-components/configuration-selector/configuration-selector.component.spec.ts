import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationSelectorComponent } from './configuration-selector.component';
import { MatFormFieldModule, MatListModule } from '@angular/material';
import { NATURAL_DROPDOWN_DATA, NaturalDropdownService } from '../../dropdown-container/dropdown.service';
import { NaturalDropdownRef } from '../../dropdown-container/dropdown-ref';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ConfigurationSelectorComponent', () => {
    let component: ConfigurationSelectorComponent;
    let fixture: ComponentFixture<ConfigurationSelectorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConfigurationSelectorComponent],
            imports: [
                MatListModule,
                FormsModule,
                ReactiveFormsModule,
                MatFormFieldModule,
            ],
            providers: [
                NaturalDropdownService,
                {
                    provide: NATURAL_DROPDOWN_DATA,
                    useValue: {},
                },
                {
                    provide: NaturalDropdownRef,
                    useValue: {},
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfigurationSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
