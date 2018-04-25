import { Subject } from 'rxjs/Subject';
import { NaturalDropdownContainerComponent } from './dropdown-container.component';
import { OverlayRef } from '@angular/cdk/overlay';
import { NaturalSearchValue } from '../types/Values';

export class NaturalDropdownRef {

    public componentInstance;
    public readonly closed = new Subject<NaturalSearchValue['value']>();

    constructor(private overlay: OverlayRef, private dropdownContainer: NaturalDropdownContainerComponent) {
        dropdownContainer.closed.subscribe(() => {
            overlay.dispose();
        });
    }

    public close(result?: NaturalSearchValue['value']) {
        this.closed.next(result);
        this.closed.complete();
        this.dropdownContainer.close();
    }

}
