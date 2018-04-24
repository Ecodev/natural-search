import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationSelectorComponent } from './configuration-selector.component';

describe('ConfigurationSelectorComponent', () => {
  let component: ConfigurationSelectorComponent;
  let fixture: ComponentFixture<ConfigurationSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
