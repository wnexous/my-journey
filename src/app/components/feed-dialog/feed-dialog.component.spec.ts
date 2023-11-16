import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedDialogComponent } from './feed-dialog.component';

describe('FeedDialogComponent', () => {
  let component: FeedDialogComponent;
  let fixture: ComponentFixture<FeedDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedDialogComponent]
    });
    fixture = TestBed.createComponent(FeedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
