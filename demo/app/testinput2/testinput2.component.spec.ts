import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Testinput2Component } from './testinput2.component';

describe('Testinput2Component', () => {
  let component: Testinput2Component;
  let fixture: ComponentFixture<Testinput2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Testinput2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Testinput2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
