import { Subject } from 'rxjs/Subject';
import { NaturalDropdownContainerComponent } from './dropdown-container.component';
import { OverlayRef } from '@angular/cdk/overlay';

export class NaturalDropdownRef {

    public componentInstance;
    public readonly closed = new Subject<any>();

    constructor(private overlay: OverlayRef, private dropdownContainer: NaturalDropdownContainerComponent) {

        dropdownContainer.closed.subscribe(() => {
            overlay.dispose();
        });

    }

    public close(result?) {
        this.closed.next(result);
        this.closed.complete();
        this.dropdownContainer.close();
    }

}
