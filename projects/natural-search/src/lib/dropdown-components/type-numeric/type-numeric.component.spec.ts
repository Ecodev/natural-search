import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeNumericComponent } from './type-numeric.component';
import { NATURAL_DROPDOWN_DATA, NaturalDropdownService } from '../../dropdown-container/dropdown.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FilterGroupConditionField } from '../../classes/graphql-doctrine.types';
import { TypeNumericConfiguration } from '@ecodev/natural-search';

describe('TypeNumericComponent', () => {
    let component: TypeNumericComponent;
    let fixture: ComponentFixture<TypeNumericComponent>;

    const condition: FilterGroupConditionField = {
        equal: {value: 123},
    };

    const config: TypeNumericConfiguration = {};

    const configWithRules: TypeNumericConfiguration = {
        min: 10,
        max: 20,
    };

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
        fixture = TestBed.createComponent<TypeNumericComponent>(TypeNumericComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get condition', () => {
        const empty: FilterGroupConditionField = {
            equal: {value: null},
        };

        const notEmpty: FilterGroupConditionField = {
            equal: {value: 123},
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
        expect(component.renderedValue.value).toBe('');

        component.init(null, null);
        expect(component.renderedValue.value).toBe('');

        component.init(condition, config);
        expect(component.renderedValue.value).toBe('123');

        component.init(condition, configWithRules);
        expect(component.renderedValue.value).toBe('123');
    });

    it('should validate according to rules', () => {
        expect(component.isValid()).toBe(false);

        component.init(null, null);
        expect(component.isValid()).toBe(false);

        component.init(condition, config);
        expect(component.isValid()).toBe(true);

        component.init(condition, configWithRules);
        expect(component.isValid()).toBe(false);
    });
});
