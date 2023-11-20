import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { FeedService } from 'src/app/service/feed/feed.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-feed-dialog',
  templateUrl: './feed-dialog.component.html',
  styleUrls: ['./feed-dialog.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, MatDialogModule, MatInputModule, MatFormFieldModule]
})
export class FeedDialogComponent {
  feedForm: FormGroup;
  isFeedIdPresent: boolean = false;

  constructor(
    private feedService: FeedService,    
    private formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<FeedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.feedForm = this.formBuilder.group({
      message: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.feedForm = this.formBuilder.group({
      message: [this.data.message || '', [Validators.required]],
    });

    this.isFeedIdPresent = !!window.localStorage.getItem('feedId');
  }

  get messageControl() {
    return this.feedForm.get('message');
  }

  get characterCount() {
    const currentLength = this.messageControl?.value ? this.messageControl.value.length : 0;
    const maxLength = this.messageControl?.getError('maxlength')?.requiredLength || 900;
    return `${currentLength}/${maxLength}`;
  }

  async createMessage() {
    if(!this.feedForm) {
      alert('O campo não deve ser vazio')
    } else {
      const message = this.feedForm.get('message')!.value

      this.feedService.createMessage(message).subscribe(() => {
        alert('Mensagem enviada com sucesso!')
        this.router.navigate(['/home'])
        .then(() => {
          window.location.reload()
        })
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
      })
    }
  }

  async updateMessage() {
    if(!this.feedForm) {
      alert('O campo não deve ser vazio')
    } else {
      const message = this.feedForm.get('message')!.value
      const feedId = window.localStorage.getItem('feedId')!;

      Promise.all([
        this.feedService.deleteMessages(feedId).subscribe(() => {

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
      }),
        this.feedService.createMessage(message).subscribe(() => {
          alert('Mensagem atualizada com sucesso!')

          window.localStorage.removeItem('feedId')

          this.router.navigate(['/home'])
          .then(() => {
            window.location.reload()
          })
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
        })
      ])
    }
  }

  removeIdIfExists() {
    if (localStorage.getItem('feedId')) {
      localStorage.removeItem('feedId');
    }
  }

}
