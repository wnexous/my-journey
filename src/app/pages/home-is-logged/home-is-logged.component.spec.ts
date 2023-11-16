import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeIsLoggedComponent } from './home-is-logged.component';

describe('HomeIsLoggedComponent', () => {
  let component: HomeIsLoggedComponent;
  let fixture: ComponentFixture<HomeIsLoggedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeIsLoggedComponent]
    });
    fixture = TestBed.createComponent(HomeIsLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
