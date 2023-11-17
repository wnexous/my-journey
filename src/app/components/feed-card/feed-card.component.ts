import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { FeedDialogComponent } from '../feed-dialog/feed-dialog.component';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, NgIf],
})
export class FeedCardComponent {
  constructor(
    public dialog: MatDialog
    ) {}

    updatedFeedDialog() {
      this.dialog.open(FeedDialogComponent, {
        width: '700px',
      });
    }

    deleteFeedDialog() {
    }
}
