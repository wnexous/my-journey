import { Component, EventEmitter } from '@angular/core';

import { Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

import { UploadService } from 'src/app/service/project/upload.service';
import { Router, ActivatedRoute } from '@angular/router';

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

      // instancia leitor de arquivos
      const fileRender = new FileReader()
      const fileName = inputElement.files[0].name

      // le a imagem de files 
      fileRender.readAsDataURL(inputElement.files[0])

      // onload recebe uma callback quando a imagem for carregada. o fileRender.result contem a base64 em string
      fileRender.onload = () => {
        this.fileInBase64 = fileRender.result!.toString()
        this.selectedFileName = fileName;
      }
      
    } else {
      console.log("No files selected");
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
      });

      window.localStorage.removeItem('projectId')
      window.localStorage.removeItem('image')

      this.router.navigate(['/profile'])
      .then(() => {
        window.location.reload()
      })
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
        this.uploadService.deleteFile(projectId).subscribe(),
        this.uploadService.updateFile(title, description, this.fileInBase64).subscribe(() => {
          alert('Updated');
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
