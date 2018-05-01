import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSelectComponent } from './type-select.component';
import { NATURAL_DROPDOWN_DATA, NaturalDropdownService } from '../../dropdown-container/dropdown.service';
import { NaturalDropdownRef } from '../../dropdown-container/dropdown-ref';
import { MatListModule } from '@angular/material';
import { NaturalDropdownContainerComponent } from '../../dropdown-container/dropdown-container.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('TypeSelectComponent', () => {
    let component: TypeSelectComponent;
    let fixture: ComponentFixture<TypeSelectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TypeSelectComponent,
                NaturalDropdownContainerComponent,
            ],
            imports: [
                CommonModule,
                FormsModule,
                MatListModule,
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
        fixture = TestBed.createComponent(TypeSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
