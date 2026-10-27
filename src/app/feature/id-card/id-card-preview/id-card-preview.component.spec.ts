import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdCardPreviewComponent } from './id-card-preview.component';

describe('IdCardPreviewComponent', () => {
  let component: IdCardPreviewComponent;
  let fixture: ComponentFixture<IdCardPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdCardPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdCardPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
