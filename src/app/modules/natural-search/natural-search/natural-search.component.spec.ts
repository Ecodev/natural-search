import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NaturalSearchComponent} from './natural-search.component';

describe('NaturalSearchComponent', () => {
    let component: NaturalSearchComponent;
    let fixture: ComponentFixture<NaturalSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NaturalSearchComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NaturalSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
