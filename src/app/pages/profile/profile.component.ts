import { Component } from '@angular/core';
import { UploadService } from 'src/app/service/project/upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public projects: any[] = [];

  constructor(private uploadService: UploadService) {}

  ngOnInit(): void {
    this.getProjects();
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
}
