import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaturalDropdownComponent } from './natural-dropdown.component';

describe('NaturalDropdownComponent', () => {
  let component: NaturalDropdownComponent;
  let fixture: ComponentFixture<NaturalDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaturalDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaturalDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
