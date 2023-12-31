import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CurriculumService } from 'src/app/service/curriculum/curriculum.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
})
export class EditButtonComponent {
  public curriculum: any

  constructor(
    private curriculumService: CurriculumService,
    private router:Router) {}

    ngOnInit(): void {
      this.getCurriculum();
    }

    redirectCurriculumUpdate() {
      this.router.navigate(['/user-resume'])
    }

    deleteCurriculum() {
      const curriculumId = this.curriculum[0]._id;
      const isConfirmed = window.confirm('Tem certeza de que deseja excluir este currículo?');
    
      if (isConfirmed) {
        this.curriculumService.deleteCurriculum(curriculumId).subscribe(
          () => {            
            this.router.navigate(['/profile']).then(() => {
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
    

    private getCurriculum() {
      this.curriculumService.getCurriculum().subscribe(
        (curriculum: any) => {
          this.curriculum = curriculum;
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
      )
    }
}
