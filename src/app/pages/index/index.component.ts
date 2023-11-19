import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AccountService } from 'src/app/service/account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule, MatCardModule]
})

export class IndexComponent {

  constructor(
    private accountService: AccountService,
    private router: Router) {}

  ngOnInit() {
    if (this.accountService.LoggedIn()) {
      this.router.navigate(['/home']);
    }
  }
}
