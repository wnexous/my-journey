import { Component, OnInit, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ViewProjectDialogComponent } from '../view-project-dialog/view-project-dialog.component';
import {NgIf} from '@angular/common';

import { UploadService } from 'src/app/service/project/upload.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
    private uploadService:UploadService,
    public dialog: MatDialog
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
    const projectName = this.projectData.title; 

    // Usar window.confirm() para exibir um alerta de confirmação com o título do projeto
    const isConfirmed = window.confirm(`Tem certeza de que deseja excluir o projeto "${projectName}"?`);
  
    // Verificar se o usuário confirmou a exclusão
    if (isConfirmed) {
      const projectId = this.projectData._id;
  
      this.uploadService.deleteFile(projectId).subscribe(
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
    } else {
      // Código a ser executado se o usuário clicar em "Cancelar"
      console.log('Exclusão cancelada pelo usuário.');
    }
  }

  openViewProjectDialog() {
    this.dialog.open(ViewProjectDialogComponent, {
      width: '700px',
      data: {
        title: this.projectData.title,
        description: this.projectData.description,
        image: this.projectData.image
      },
    });
  }

}
