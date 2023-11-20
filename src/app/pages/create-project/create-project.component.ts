import { Component } from '@angular/core';

import { Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

import { UploadService } from 'src/app/service/project/upload.service';
import { AccountService } from 'src/app/service/account/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf, MatButtonModule, MatTooltipModule, MatIconModule],
})

export class CreateProjectComponent {
  createProjetForm: FormGroup;
  selectedFileName: string | null = null;
  fileInBase64: string
  projectIdExists: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private uploadService: UploadService,
    private accountService: AccountService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) {
    this.createProjetForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['']
    });
  }

  ngOnInit() {

    if (!this.accountService.LoggedIn()) {
      this.router.navigate(['/signin']);
    }

    this.changeTextTitleadButton();

    this.activatedRoute.params.subscribe(params => {
      const projectData = JSON.parse(params['project']);

      this.createProjetForm.patchValue({
        title: projectData.title,
        description: projectData.description,
      });
    });
  } 

  async onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
  
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const fileRender = new FileReader();
      const file = inputElement.files[0];
      const fileName = file.name;
    
      fileRender.readAsDataURL(file);
  
      fileRender.onload = () => {
        this.selectedFileName = fileName;

        const img = new Image();
        img.src = fileRender.result as string;
  
        img.onload = () => {
          const elem = document.createElement('canvas');
          elem.width = 300;
          elem.height = 300;
          const ctx = elem.getContext('2d');
          ctx?.drawImage(img, 0, 0, 300, 300);
          this.fileInBase64 = ctx?.canvas.toDataURL() || '';
        }
      };
    } else {
      console.log('No files selected');
      this.selectedFileName = null;
    }
  }  

  async createProject() {
    if (!this.createProjetForm.valid || !this.fileInBase64) {
      alert("As informações estão inválidas");
    } else {
      const title = this.createProjetForm.get('title')!.value;
      const description = this.createProjetForm.get('description')!.value;

      this.uploadService.uploadFile(title, description, this.fileInBase64).subscribe(() => {
        alert('Uploaded');

        window.localStorage.removeItem('projectId')
        window.localStorage.removeItem('image')
  
        this.router.navigate(['/profile'])
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
      });
    }

  }

  async updateProject() {
    if(!this.createProjetForm.valid) {
      alert("As informações estão inválidas");
    } else {
      const title = this.createProjetForm.get('title')!.value;
      const description = this.createProjetForm.get('description')!.value;
      const projectId = this.getProjectId()!;
  
      Promise.all([
        this.uploadService.deleteFile(projectId).subscribe(() => {
          
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
        this.uploadService.updateFile(title, description, this.fileInBase64).subscribe(() => {
          alert('Updated');
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

      window.localStorage.removeItem('projectId')
      window.localStorage.removeItem('image')
  
      this.router.navigate(['/profile'])
      .then(() => {
        window.location.reload()
      })
    }
  }

  public changeTextTitleadButton() {
    this.projectIdExists = !!this.getProjectId();
  } 


  public getProjectId() {
    return window.localStorage.getItem('projectId');
  }

}
