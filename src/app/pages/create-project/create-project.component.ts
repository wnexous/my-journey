import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

import {Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

import { UploadService } from 'src/app/service/upload.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf, MatButtonModule, MatTooltipModule, MatIconModule],
})

export class CreateProjectComponent {
  createProjetForm: FormGroup;

  file: File | null = null;
  selectedFileName: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private uploadService: UploadService
  ) {
    this.createProjetForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onFileChange(event: any) {
    if (event.target && event.target.files && event.target.files.length > 0) {
      console.log(event.target.files[0]);
      this.file = event.target.files[0];
      this.selectedFileName = this.file ? this.file.name : null;
    } else {
      console.log("No files selected");
      this.file = null;
      this.selectedFileName = null;
    }
  }
  

  upload() {
    if (this.createProjetForm.valid && this.file) {
      const title = this.createProjetForm.get('title')!.value;
      const description = this.createProjetForm.get('description')!.value;

      this.uploadService.uploadFile(title, description, this.file).subscribe((resp) => {
        alert('Uploaded');
      });
    } else {
      alert("Please select a file first");
    }
  }  
}
