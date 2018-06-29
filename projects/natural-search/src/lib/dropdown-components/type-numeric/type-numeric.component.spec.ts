import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeNumericComponent } from './type-numeric.component';
import {
    NATURAL_DROPDOWN_DATA,
    NaturalDropDownData,
    NaturalDropdownService,
} from '../../dropdown-container/dropdown.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FilterGroupConditionField } from '../../classes/graphql-doctrine.types';
import { TypeNumericConfiguration } from '@ecodev/natural-search';

describe('TypeNumericComponent', () => {
    let component: TypeNumericComponent;
    let fixture: ComponentFixture<TypeNumericComponent>;
    const data: NaturalDropDownData = {
        condition: null,
        configuration: null,
    };

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

    function createComponent(c: FilterGroupConditionField | null, configuration: TypeNumericConfiguration | null) {
        data.condition = c;
        data.configuration = configuration;
        TestBed.overrideProvider(NATURAL_DROPDOWN_DATA, {useValue: data});
        fixture = TestBed.createComponent<TypeNumericComponent>(TypeNumericComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }

    it('should create', () => {
        createComponent(null, null);
        expect(component).toBeTruthy();
    });

    it('should get condition', () => {
        const empty: any = {
            equal: {value: null},
        };

        const notEmpty: FilterGroupConditionField = {
            equal: {value: 123},
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
        expect(component.renderedValue.value).toBe('123');

        createComponent(condition, configWithRules);
        expect(component.renderedValue.value).toBe('123');
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
