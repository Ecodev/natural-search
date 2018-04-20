import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaturalInputComponent } from './natural-input.component';

describe('NaturalInputComponent', () => {
  let component: NaturalInputComponent;
  let fixture: ComponentFixture<NaturalInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaturalInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaturalInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
