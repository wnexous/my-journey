import { Component } from '@angular/core';
import { FeedDialogComponent } from 'src/app/components/feed-dialog/feed-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FeedService } from 'src/app/service/feed/feed.service';
import { AccountService } from 'src/app/service/account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-is-logged',
  templateUrl: './home-is-logged.component.html',
  styleUrls: ['./home-is-logged.component.scss']
})
export class HomeIsLoggedComponent {
  public feeds: any[] = [];
  userName: string;

  constructor(
    private accountService: AccountService,
    private feedService: FeedService,
    private router: Router,
    public dialog: MatDialog
    ) {}

    ngOnInit(): void {

      if (!this.accountService.LoggedIn()) {
        this.router.navigate(['/signin']);
      }

      this.getMessages()
      this.userName = window.localStorage.getItem('name') ?? ''
    }

  openFeedDialog() {
    this.dialog.open(FeedDialogComponent, {
      width: '700px'
    });
  }

  getMessages() {
    this.feedService.getMessages().subscribe(
      (feeds: any) => {
        this.feeds = feeds;
      },
      (error) => {
        console.error('Erro ao obter dados dos comentários:', error);
      }
    );
  }

  getUserName() {

  }
}
