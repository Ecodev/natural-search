import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSelectComponent } from './type-select.component';
import { NATURAL_DROPDOWN_DATA, NaturalDropdownService } from '../../dropdown-container/dropdown.service';
import { NaturalDropdownRef } from '../../dropdown-container/dropdown-ref';
import { MatListModule } from '@angular/material';
import { NaturalDropdownContainerComponent } from '../../dropdown-container/dropdown-container.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterConditionField } from '../../classes/graphql-doctrine.types';
import { TypeSelectConfiguration } from './TypeSelectConfiguration';

describe('TypeSelectComponent', () => {
    let component: TypeSelectComponent;
    let fixture: ComponentFixture<TypeSelectComponent>;
    let dialogCloseSpy: jasmine.Spy;

    const condition: FilterConditionField = {
        in: {values: ['bar', 'baz']},
    };

    const configScalar: TypeSelectConfiguration = {
        items: [
            'foo',
            'bar',
            'baz',
        ],
    };

    const configObject: TypeSelectConfiguration = {
        items: [
            {id: 'foo', name: 'foo label'},
            {id: 'bar', name: 'bar label'},
            {id: 'baz', name: 'baz label'},
        ],
    };

    const configSingle: TypeSelectConfiguration = {
        items: [
            'foo',
            'bar',
            'baz',
        ],
        multiple: false,
    };

    beforeEach(async(() => {
        const dialogRef = {close: () => true};
        dialogCloseSpy = spyOn(dialogRef, 'close');

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
                    useValue: dialogRef,
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent<TypeSelectComponent>(TypeSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get id', () => {
        expect(component.getId('foo')).toBe('foo');
        expect(component.getId(123)).toBe(123);
        expect(component.getId(true)).toBe(true);
        expect(component.getId(false)).toBe(false);
        expect(component.getId({id: 123, name: 'foo'})).toBe(123);
        expect(component.getId({value: 123, name: 'foo'})).toBe(123);
    });

    it('should get display', () => {
        expect(component.getDisplay('foo')).toBe('foo');
        expect(component.getDisplay(123)).toBe(123);
        expect(component.getDisplay(true)).toBe(true);
        expect(component.getDisplay(false)).toBe(false);
        expect(component.getDisplay({id: 123, name: 'foo'})).toBe('foo');
        expect(component.getDisplay({value: 123, name: 'foo'})).toBe('foo');
    });

    it('should get condition', () => {
        const empty: FilterConditionField = {
            in: {values: []},
        };

        const notEmpty: FilterConditionField = {
            in: {values: ['bar', 'baz']},
        };

        expect(component.getCondition()).toEqual(empty);

        component.init(null, null);
        expect(component.getCondition()).toEqual(empty);

        component.init(condition, configScalar);
        expect(component.getCondition()).toEqual(notEmpty);

        component.init(condition, configObject);
        expect(component.getCondition()).toEqual(notEmpty);
    });

    it('should rendered value joined by comma', () => {
        expect(component.getRenderedValue()).toBe('');

        component.init(null, null);
        expect(component.getRenderedValue()).toBe('');

        component.init(condition, configScalar);
        expect(component.getRenderedValue()).toBe('bar, baz');

        component.init(condition, configObject);
        expect(component.getRenderedValue()).toBe('bar label, baz label');
    });

    it('should validate if at least one selection', () => {
        expect(component.isValid()).toBe(false);

        component.selected.push('foo');
        expect(component.isValid()).toBe(true);
    });

    it('should not close if multiple', () => {
        component.closeIfSingleAndHasValue();
        expect(dialogCloseSpy).not.toHaveBeenCalled();

        component.init(condition, configScalar);
        component.closeIfSingleAndHasValue();
        expect(dialogCloseSpy).not.toHaveBeenCalled();
    });

    it('should not close if single but has no value', () => {
        component.init(null, configSingle);
        component.closeIfSingleAndHasValue();
        expect(dialogCloseSpy).not.toHaveBeenCalled();
    });

    it('should close if single and has value', () => {
        component.init(condition, configSingle);
        component.closeIfSingleAndHasValue();

        expect(dialogCloseSpy).toHaveBeenCalledWith({
            condition: {in: {values: ['bar', 'baz']}},
            rendered: 'bar, baz',
        });
    });
});
