import { Component, OnInit } from '@angular/core';
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

import { CurriculumService } from 'src/app/service/curriculum/curriculum.service';
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
    private curriculumService: CurriculumService) {
    this.createResumeForm = this.formBuilder.group({
      name: { value: '', disabled: true }, // Desabilitar o campo name
      email: { value: '', disabled: true }, // Desabilitar o campo email
      phoneNumber: ['', Validators.required],
      birthDate: ['', Validators.required],
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

  ngOnInit() {
    console.log("Chamando ngOnInit");
    this.curriculumService.getCurriculum().subscribe(
      (curriculum: any) => {
        console.log("Dados do curriculum:", curriculum);
        if (curriculum) {
          this.createResumeForm.patchValue({
            name: curriculum[0].name,
            email: curriculum[0].email,
            phoneNumber: curriculum[0].phoneNumber,
            birthDate: new Date(curriculum[0].birthDate),
            street: curriculum[0].street,
            streetNumber: curriculum[0].streetNumber,
            district: curriculum[0].district,
            city: curriculum[0].city,
            state: curriculum[0].state,
            professionalObjective: curriculum[0].professionalObjective,
            professionalExperience: curriculum[0].professionalExperience,
            coursesAndCertifications: curriculum[0].coursesAndCertifications,
            languages: curriculum[0].languages,
          });
        }
      },
      (error) => {
        console.log("Erro ao obter campo", error);
      }
    );
  }
  
  
  
  OnSubmit() {
    if (this.createResumeForm.valid) {
      const formData = this.createResumeForm.value;
      const datePipe = new DatePipe('pt-BR');
      formData.birthDate = datePipe.transform(formData.birthDate, 'dd/MM/yyyy');

      console.log(formData)
      this.curriculumService.createCurriculum(formData).subscribe((resp) => {
        alert('Formulário enviado');
      });
    } else {
      console.log("Erro ao enviar");
    }
    }
}