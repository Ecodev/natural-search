import { Injectable, Injector } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentType } from '@angular/cdk/portal';

@Injectable()
export class DropdownService {

    constructor(private overlay: Overlay, private injector: Injector) {
    }

    public open<T>(component: ComponentType<T>) {

    }

}
