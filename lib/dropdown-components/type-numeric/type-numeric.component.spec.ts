import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeNumericComponent } from './type-numeric.component';

describe('TypeNumericComponent', () => {
  let component: TypeNumericComponent;
  let fixture: ComponentFixture<TypeNumericComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeNumericComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeNumericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
