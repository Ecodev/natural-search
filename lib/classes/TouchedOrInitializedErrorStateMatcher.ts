import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

/**
 * If input is errored and is touched or initialized
 */
export class TouchedOrInitializedErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        const hasValue = control && control.invalid && !!control.value;
        const isTouched = control && control.invalid && (control.dirty || control.touched || isSubmitted);
        return hasValue || isTouched;
    }
}
