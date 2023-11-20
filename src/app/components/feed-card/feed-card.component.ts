import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { FeedDialogComponent } from '../feed-dialog/feed-dialog.component';
import { FeedService } from 'src/app/service/feed/feed.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
    private feedService: FeedService,
    private router: Router,
    public dialog: MatDialog
    ) {}

    @Input() feedData: any;
    

    ngOnInit() {
      this.email = localStorage.getItem('email')
    }
    
    updatedFeedDialog() {
      const { _id } = this.feedData;
      window.localStorage.setItem('feedId', _id)

      this.dialog.open(FeedDialogComponent, {
        width: '700px',
        data: {
          message: this.feedData.message
        }
      });
    }

    deleteFeedDialog() {
      const messageId = this.feedData._id;
      const isConfirmed = window.confirm('Tem certeza de que deseja excluir esta mensagem?');
    
      if (isConfirmed) {
        this.feedService.deleteMessages(messageId).subscribe(
          () => {            
            this.router.navigate(['/home']).then(() => {
              window.location.reload();
            });
          },
          (error) => {
            if(error instanceof HttpErrorResponse) {
              const errorMessage = error.error.message
              
              if(errorMessage) {
                window.localStorage.clear();
                this.router.navigate(['/'])
                .then(() => {
                  window.location.reload()
                })
              }
           }
          }
        );
      }
    }
}
