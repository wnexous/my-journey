import { Component, OnInit, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {NgIf} from '@angular/common';

import { UploadService } from 'src/app/service/project/upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, NgIf],
})
export class CardComponent {

  constructor(
    private router:Router,
    private uploadService:UploadService
    ) {}

  @Input() projectData: any; 

  editProject() {

    const { image, _id } = this.projectData;
    window.localStorage.setItem('image', image)
    window.localStorage.setItem('projectId', _id)

    delete this.projectData.image

    this.router.navigate(['/create-project', 
    { 
      project: JSON.stringify(this.projectData) 
    }]);
  }

  deleteProject() {
    const projectId = this.projectData._id;

    this.uploadService.deleteFile(projectId).subscribe(
      () => {
        this.router.navigate(['/profile']).then(() => {
          window.location.reload();
        });
      },
      (error) => {
        console.error('Erro ao excluir o projeto:', error);
      }
    );
  }

}
