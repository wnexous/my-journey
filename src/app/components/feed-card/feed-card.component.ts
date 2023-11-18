import { Component, Input } from '@angular/core';
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
  email: any;

  constructor(
    public dialog: MatDialog
    ) {}

    @Input() feedData: any;

    ngOnInit() {
      this.email = localStorage.getItem('email')
    }
    
    updatedFeedDialog() {
      this.dialog.open(FeedDialogComponent, {
        width: '700px',
        data: {
          message: this.feedData.message
        }
      });
    }

    deleteFeedDialog() {
    }
}
