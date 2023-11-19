import { Component } from '@angular/core';
import { UploadService } from 'src/app/service/project/upload.service';
import { CurriculumService } from 'src/app/service/curriculum/curriculum.service';
import { AccountService } from 'src/app/service/account/account.service';
import { Router } from '@angular/router';
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
        console.error('Erro ao obter dados dos projetos:', error);
      }
    );
  }

  private getCurriculum(): void {
    this.curriculumService.getCurriculum().subscribe(
      (curriculum: any) => {
        this.curriculum = curriculum;
      },      
      (error) => {
        console.error('Erro ao obter dados do curriculo:', error);
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
