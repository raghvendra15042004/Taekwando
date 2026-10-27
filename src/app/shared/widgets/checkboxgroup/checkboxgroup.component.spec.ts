import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxgroupComponent } from './checkboxgroup.component';

describe('CheckboxgroupComponent', () => {
  let component: CheckboxgroupComponent;
  let fixture: ComponentFixture<CheckboxgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
