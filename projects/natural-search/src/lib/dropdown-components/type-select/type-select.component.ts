import { Component, Inject, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NATURAL_DROPDOWN_DATA } from '../../dropdown-container/dropdown.service';
import { NaturalDropdownRef } from '../../dropdown-container/dropdown-ref';
import { TypeSelectConfiguration, TypeSelectItem } from './TypeSelectConfiguration';
import { DropdownComponent } from '../../types/DropdownComponent';
import { MatSelectionList } from '@angular/material';
import { FilterGroupConditionField, Scalar } from '../../classes/graphql-doctrine.types';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
    templateUrl: './type-select.component.html',
    styleUrls: ['./type-select.component.scss'],
})
export class TypeSelectComponent implements DropdownComponent, OnDestroy {

    public renderedValue = new BehaviorSubject<string>('');
    @ViewChild(MatSelectionList) list: MatSelectionList;
    public configuration: TypeSelectConfiguration;
    public selected: Scalar[] = [];
    public items: TypeSelectItem[] = [];
    private subscription: Subscription;

    private readonly defaults: TypeSelectConfiguration = {
        items: [],
        multiple: true,
    };

    private dirty = false;

    constructor(@Inject(NATURAL_DROPDOWN_DATA) public data: any,
                protected dropdownRef: NaturalDropdownRef,
                private changeDetectorRef: ChangeDetectorRef) {
        this.configuration = this.defaults;
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    public init(condition: FilterGroupConditionField, configuration: TypeSelectConfiguration): void {
        this.configuration = {...this.defaults, ...configuration};

        if (!this.isMultiple()) {
            (this.list.selectedOptions as any)._multiple = false;
        }

        const wantedIds = (condition && condition.in) ? condition.in.values : [];
        if (Array.isArray(this.configuration.items)) {
            this.items = this.configuration.items;
            this.reloadSelection(wantedIds);
        } else {
            this.subscription = this.configuration.items.subscribe(items => {
                this.items = items;
                this.reloadSelection(wantedIds);

                // Without this, the dropdown would not show its content until user interact with the page (click or key press)
                this.changeDetectorRef.markForCheck();
            });
        }
    }

    /**
     * Reload selection, according to possible values from configuration
     */
    private reloadSelection(wantedIds: Scalar[]): void {
        const possibleIds = this.items.map(item => this.getId(item));
        this.selected = wantedIds.filter(id => typeof possibleIds.find(i => i === id) !== 'undefined');
        this.renderedValue.next(this.getRenderedValue());
    }

    private isMultiple(): boolean {
        return this.configuration.multiple;
    }

    public getId(item: TypeSelectItem): Scalar {
        if (typeof item === 'object' && item) {
            return (item as any).id || (item as any).value;
        }

        return item as Scalar;
    }

    public getDisplay(item: TypeSelectItem): Scalar {
        if (typeof item === 'object' && item && item.name) {
            return item.name;
        }

        return item as Scalar;
    }

    private getItemById(id: Scalar): TypeSelectItem {
        return this.items.find(item => this.getId(item) === id);
    }

    public closeIfSingleAndHasValue(): void {
        this.dirty = true;
        if (this.isValid()) {
            this.renderedValue.next(this.getRenderedValue());

            if (!this.isMultiple()) {
                this.dropdownRef.close({
                    condition: this.getCondition(),
                });
            }
        }
    }

    public getCondition(): FilterGroupConditionField {
        return {
            in: {values: this.selected},
        };
    }

    private getRenderedValue(): string {
        if (!this.selected) {
            return '';
        }

        return this.selected.map(id => this.getDisplay(this.getItemById(id))).join(', ');
    }

    public isValid(): boolean {
        return this.selected.length > 0;
    }

    public isDirty(): boolean {
        return this.dirty;
    }

}
