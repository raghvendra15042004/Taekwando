import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TieSheetComponent } from './tie-sheet.component';

describe('TieSheetComponent', () => {
  let component: TieSheetComponent;
  let fixture: ComponentFixture<TieSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TieSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TieSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
