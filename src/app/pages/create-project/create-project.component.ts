import { Component, EventEmitter } from '@angular/core';

import { Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

import { UploadService } from 'src/app/service/project/upload.service';

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
  constructor(

    private formBuilder: FormBuilder,
    private uploadService: UploadService
  ) {
    this.createProjetForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
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
      fileRender.onload = () => this.fileInBase64 = fileRender.result!.toString()

      // salva o nome da imagem pra rendenizar no front
      this.selectedFileName = fileName
    } else {
      console.log("No files selected");
      this.selectedFileName = null;
    }
  }

  async upload() {
    if (this.createProjetForm.valid && this.fileInBase64) {
      const title = this.createProjetForm.get('title')!.value;
      const description = this.createProjetForm.get('description')!.value;

      this.uploadService.uploadFile(title, description, this.fileInBase64).subscribe((resp) => {
        alert('Uploaded');
      });

    } else {
      alert("Please select a file first");
    }
  }
}
