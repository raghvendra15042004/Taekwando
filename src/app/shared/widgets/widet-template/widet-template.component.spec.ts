import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidetTemplateComponent } from './widet-template.component';

describe('WidetTemplateComponent', () => {
  let component: WidetTemplateComponent;
  let fixture: ComponentFixture<WidetTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidetTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidetTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
