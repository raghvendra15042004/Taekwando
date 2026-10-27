import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuntimeWidgetComponent } from './runtime-widget.component';

describe('RuntimeWidgetComponent', () => {
  let component: RuntimeWidgetComponent;
  let fixture: ComponentFixture<RuntimeWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuntimeWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuntimeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
