import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ComponentType } from '@angular/cdk/portal';

export interface NaturalSearchDropdownComponent extends ComponentType<any> {

    readonly valueChanges: BehaviorSubject<any>;
    readonly renderedValueChanges: BehaviorSubject<any>;

    /**
     * Set the custom configuration for the type
     * such as data source for possible values, display
     * function for a value, etc.
     */
    setConfiguration(configuration: any): void;

    /**
     * Set value for component initialisation purposes
     * @param value
     */
    setValue(value: any): void;

}
