import { Component } from '@angular/core';
import { AccountService } from 'src/app/service/account/account.service';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/service/project/upload.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  public projects: any[] = [];

  constructor(
    private accountService: AccountService,
    private uploadService: UploadService,
    private router:Router) {}

    ngOnInit(): void {
    
      if (!this.accountService.LoggedIn()) {
        this.router.navigate(['/signin']);
      }
  
      this.getAllProjects();
    }

    private getAllProjects(): void {
      this.uploadService.getAllProjects().subscribe(
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
}
