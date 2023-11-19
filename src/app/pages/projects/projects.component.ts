import { Component } from '@angular/core';
import { AccountService } from 'src/app/service/account/account.service';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/service/project/upload.service';

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
          console.error('Erro ao obter dados dos projetos:', error);
        }
      );
    }
}
