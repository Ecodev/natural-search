import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeNumericComponent } from './type-numeric.component';
import { NATURAL_DROPDOWN_DATA, NaturalDropdownService } from '../../dropdown-container/dropdown.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TypeNumericComponent', () => {
    let component: TypeNumericComponent;
    let fixture: ComponentFixture<TypeNumericComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TypeNumericComponent],
            imports: [
                NoopAnimationsModule,
                FormsModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
            ],
            providers: [
                NaturalDropdownService,
                {
                    provide: NATURAL_DROPDOWN_DATA,
                    useValue: {},
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TypeNumericComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
