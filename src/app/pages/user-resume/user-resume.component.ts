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
import { Router } from '@angular/router';

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
    private curriculumService: CurriculumService,
    private router: Router) {
    this.createResumeForm = this.formBuilder.group({
      name: { value: '', disabled: true },
      email: { value: '', disabled: true },
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

  public getUser() {
    this.curriculumService.getUser().subscribe(
      (user: any) => {
        console.log("Dados do usuário:", user);
        if(user) {
          this.createResumeForm.patchValue({
            name: user[0].name,
            email: user[0].email,
          })
        }
      },
      (error) => {
        console.log("Erro ao obter campo", error);
      }
    )
  }

  public getCurriculum() {
    this.curriculumService.getCurriculum().subscribe(
      (curriculum: any) => {
        console.log("Dados do curriculum:", curriculum);
        if (curriculum) {
          const curriculo = curriculum[0]
          const dateBrFormat = curriculo.birthDate.split("/")
          const parsedDate = new Date([dateBrFormat[1], dateBrFormat[0], dateBrFormat[2]].join("/"))
          console.log(parsedDate)
          this.createResumeForm.patchValue({
            phoneNumber: curriculo.phoneNumber,
            birthDate: parsedDate,
            street: curriculo.street,
            streetNumber: curriculo.streetNumber,
            district: curriculo.district,
            city: curriculo.city,
            state:curriculo.state,
            professionalObjective: curriculo.professionalObjective,
            professionalExperience: curriculo.professionalExperience,
            coursesAndCertifications: curriculo.coursesAndCertifications,
            languages: curriculo.languages,
          });
        }
      },
      (error) => {
        console.log("Erro ao obter campo", error);
      }
    );
  }

  ngOnInit() {
    this.getUser();
    this.getCurriculum();
  }
  
  OnSubmit() {
    if (this.createResumeForm.valid) {

      this.createResumeForm.get('name')?.enable();
      this.createResumeForm.get('email')?.enable();

      const formData = this.createResumeForm.value;
      const datePipe = new DatePipe('pt-BR');
      formData.birthDate = datePipe.transform(formData.birthDate, 'dd/MM/yyyy');
  
      console.log(formData);
      console.log(formData.name);
      console.log(formData.email);

      this.curriculumService.createCurriculum(formData).subscribe(
        (resp) => {
          alert('Formulário enviado');

          this.router.navigate(['/profile'])
          .then(() => {
            window.location.reload()
          })

        },
        (error) => {
          console.log('Erro ao enviar formulário', error);
        }
      );
    }
  }
}