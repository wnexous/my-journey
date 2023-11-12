import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuIsLoggedComponent } from './menu-is-logged.component';

describe('MenuIsLoggedComponent', () => {
  let component: MenuIsLoggedComponent;
  let fixture: ComponentFixture<MenuIsLoggedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuIsLoggedComponent]
    });
    fixture = TestBed.createComponent(MenuIsLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
