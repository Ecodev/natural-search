import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeNumericRangeComponent } from './type-numeric-range.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('TypeNumericRangeComponent', () => {
    let component: TypeNumericRangeComponent;
    let fixture: ComponentFixture<TypeNumericRangeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TypeNumericRangeComponent],
            imports: [
                NoopAnimationsModule,
                FormsModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TypeNumericRangeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
