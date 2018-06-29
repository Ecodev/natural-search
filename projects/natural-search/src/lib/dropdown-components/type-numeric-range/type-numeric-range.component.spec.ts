import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeNumericRangeComponent } from './type-numeric-range.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterGroupConditionField } from '../../classes/graphql-doctrine.types';
import { TypeRangeConfiguration } from './TypeNumericRangeConfiguration';
import {
    NATURAL_DROPDOWN_DATA,
    NaturalDropDownData,
} from '../../dropdown-container/dropdown.service';

describe('TypeNumericRangeComponent', () => {
    let component: TypeNumericRangeComponent;
    let fixture: ComponentFixture<TypeNumericRangeComponent>;
    const data: NaturalDropDownData = {
        condition: null,
        configuration: null,
    };

    const condition: FilterGroupConditionField = {
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
            providers: [
                {
                    provide: NATURAL_DROPDOWN_DATA,
                    useValue: data,
                },
            ],
        }).compileComponents();
    }));

    function createComponent(c: FilterGroupConditionField | null, configuration: TypeRangeConfiguration | null) {
        data.condition = c;
        data.configuration = configuration;
        TestBed.overrideProvider(NATURAL_DROPDOWN_DATA, {useValue: data});
        fixture = TestBed.createComponent<TypeNumericRangeComponent>(TypeNumericRangeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }

    it('should create', () => {
        createComponent(null, null);
        expect(component).toBeTruthy();
    });

    it('should get condition', () => {
        const empty: any = {
            between: {from: null, to: null},
        };

        const notEmpty: FilterGroupConditionField = {
            between: {from: 12, to: 18},
        };

        createComponent(null, null);
        expect(component.getCondition()).toEqual(empty);

        createComponent(condition, config);
        expect(component.getCondition()).toEqual(notEmpty);

        createComponent(condition, configWithRules);
        expect(component.getCondition()).toEqual(notEmpty);
    });

    it('should rendered value as string', () => {
        createComponent(null, null);
        expect(component.renderedValue.value).toBe('');

        createComponent(condition, config);
        expect(component.renderedValue.value).toBe('12 - 18');

        createComponent(condition, configWithRules);
        expect(component.renderedValue.value).toBe('12 - 18');
    });

    it('should validate according to rules', () => {
        createComponent(null, null);
        expect(component.isValid()).toBe(false);

        createComponent(condition, config);
        expect(component.isValid()).toBe(true);

        createComponent(condition, configWithRules);
        expect(component.isValid()).toBe(false);
    });
});
