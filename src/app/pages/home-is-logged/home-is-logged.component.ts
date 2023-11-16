import { Component } from '@angular/core';
import { FeedDialogComponent } from 'src/app/components/feed-dialog/feed-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home-is-logged',
  templateUrl: './home-is-logged.component.html',
  styleUrls: ['./home-is-logged.component.scss']
})
export class HomeIsLoggedComponent {

  constructor(
    public dialog: MatDialog
    ) {}

  openFeedDialog() {
    this.dialog.open(FeedDialogComponent, {
      width: '700px'
    });
  }
}
