import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

import {Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import { HttpClient } from '@angular/common/http';
import { ResumeService } from 'src/app/service/resume.service';
@Component({
  selector: 'user-resume',
  templateUrl: './user-resume.component.html',
  styleUrls: ['./user-resume.component.scss'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf, MatButtonModule, MatTooltipModule, MatIconModule, MatDatepickerModule, MatNativeDateModule],
})
export class UserResumeComponent {
  createResumeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient,
    private resumeService: ResumeService) {
    this.createResumeForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      birthdate: ['', Validators.required],
      street: ['', Validators.required],
      streetNumber: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      professionalObjective: [''],
      professionalExperience: [''],
      coursesAndCertifications: [''],
      languages: [''],
    });
  }

  OnSubmit() {
    if (this.createResumeForm.valid) {
      const formData = this.createResumeForm.value;
      const datePipe = new DatePipe('pt-BR');
      formData.birthdate = datePipe.transform(formData.birthdate, 'dd/MM/yyyy');

      console.log(formData)
      this.resumeService.createResume(formData).subscribe((resp) => {
        alert('Formulário enviado');
      });
    } else {
      console.log("Erro ao enviar");
    }
    }
}