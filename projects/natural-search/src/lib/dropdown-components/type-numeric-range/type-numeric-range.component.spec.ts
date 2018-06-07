import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeNumericRangeComponent } from './type-numeric-range.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterConditionField } from '../../classes/graphql-doctrine.types';
import { TypeRangeConfiguration } from './TypeNumericRangeConfiguration';

describe('TypeNumericRangeComponent', () => {
    let component: TypeNumericRangeComponent;
    let fixture: ComponentFixture<TypeNumericRangeComponent>;

    const condition: FilterConditionField = {
        between: {from: 12, to: 18},
    };

    const config: TypeRangeConfiguration = {};

    const configWithRules: TypeRangeConfiguration = {
        min: 1,
        max: 10,
        fromRequired: true,
    };

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
        fixture = TestBed.createComponent<TypeNumericRangeComponent>(TypeNumericRangeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get condition', () => {
        const empty: FilterConditionField = {
            between: {from: null, to: null},
        };

        const notEmpty: FilterConditionField = {
            between: {from: 12, to: 18},
        };

        expect(component.getCondition()).toEqual(empty);

        component.init(null, null);
        expect(component.getCondition()).toEqual(empty);

        component.init(condition, config);
        expect(component.getCondition()).toEqual(notEmpty);

        component.init(condition, configWithRules);
        expect(component.getCondition()).toEqual(notEmpty);
    });

    it('should rendered value as string', () => {
        expect(component.getRenderedValue()).toBe('');

        component.init(null, null);
        expect(component.getRenderedValue()).toBe('');

        component.init(condition, config);
        expect(component.getRenderedValue()).toBe('12 - 18');

        component.init(condition, configWithRules);
        expect(component.getRenderedValue()).toBe('12 - 18');
    });

    it('should validate according to rules', () => {
        expect(component.isValid()).toBe(true);

        component.init(null, null);
        expect(component.isValid()).toBe(true);

        component.init(condition, config);
        expect(component.isValid()).toBe(true);

        component.init(condition, configWithRules);
        expect(component.isValid()).toBe(false);
    });
});
