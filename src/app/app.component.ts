import { Component, OnInit } from '@angular/core';
import { AccountService } from './service/account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public account:AccountService){}
  
  ngOnInit() {
    this.account.Login();
  }
}
