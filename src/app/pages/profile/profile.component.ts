import { Component } from '@angular/core';
import { UploadService } from 'src/app/service/project/upload.service';
import { CurriculumService } from 'src/app/service/curriculum/curriculum.service';
import { AccountService } from 'src/app/service/account/account.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public projects: any[] = [];
  public curriculum: any

  constructor(
    private accountService: AccountService,
    private uploadService: UploadService,
    private curriculumService: CurriculumService,
    private router:Router) {}

  ngOnInit(): void {
    
    if (!this.accountService.LoggedIn()) {
      this.router.navigate(['/signin']);
    }

    this.getProjects();
    this.getCurriculum();
  }

  private getProjects(): void {
    this.uploadService.getProject().subscribe(
      (projects: any) => {
        this.projects = projects;
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

  private getCurriculum(): void {
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

  public redirectCreateProject() {
    this.router.navigate(['/create-project'])
  }

  public redirectCurriculum() {
    this.router.navigate(['/user-resume'])
  }

}
