import { Component } from '@angular/core';
import { AccountService } from 'src/app/service/account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
  constructor(
    private accountService: AccountService,
    private router: Router) {}

  ngOnInit() {
    if (this.accountService.LoggedIn()) {
      this.router.navigate(['/home']);
    }
  }
}
