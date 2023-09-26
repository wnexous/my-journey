import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuHomeIsNotLoggedComponent } from './menu-home-is-not-logged.component';

describe('MenuHomeIsNotLoggedComponent', () => {
  let component: MenuHomeIsNotLoggedComponent;
  let fixture: ComponentFixture<MenuHomeIsNotLoggedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuHomeIsNotLoggedComponent]
    });
    fixture = TestBed.createComponent(MenuHomeIsNotLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
