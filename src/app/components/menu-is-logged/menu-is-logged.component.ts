import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu-is-logged',
  templateUrl: './menu-is-logged.component.html',
  styleUrls: ['./menu-is-logged.component.scss']
})
export class MenuIsLoggedComponent {

  constructor(private router:Router){}

  onLogoutClick(): void {
    window.localStorage.clear();
    this.router.navigate(['/signin'])
    .then(() => {
      window.location.reload()
    })
  }
}