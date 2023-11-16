import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectDialogComponent } from './view-project-dialog.component';

describe('ViewProjectDialogComponent', () => {
  let component: ViewProjectDialogComponent;
  let fixture: ComponentFixture<ViewProjectDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProjectDialogComponent]
    });
    fixture = TestBed.createComponent(ViewProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
