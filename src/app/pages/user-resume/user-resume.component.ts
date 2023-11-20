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
import { AccountService } from 'src/app/service/account/account.service';

import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
    private accountService: AccountService,
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

  ngOnInit() {

    if (!this.accountService.LoggedIn()) {
      this.router.navigate(['/signin']);
    }
    
    this.getUser();
    this.getCurriculum();
  }

  public getUser() {
    this.curriculumService.getUser().subscribe(
      (user: any) => {
        if(user) {
          this.createResumeForm.patchValue({
            name: user[0].name,
            email: user[0].email,
          })
        }
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
    )
  }

  public getCurriculum() {
    this.curriculumService.getCurriculum().subscribe(
      (curriculum: any) => {
        if (curriculum) {
          const curriculo = curriculum[0]
          const dateBrFormat = curriculo.birthDate.split("/")
          const parsedDate = new Date([dateBrFormat[1], dateBrFormat[0], dateBrFormat[2]].join("/"))
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
  }
  
  OnSubmit() {
    if (this.createResumeForm.valid) {

      this.createResumeForm.get('name')?.enable();
      this.createResumeForm.get('email')?.enable();

      const formData = this.createResumeForm.value;
      const datePipe = new DatePipe('pt-BR');
      formData.birthDate = datePipe.transform(formData.birthDate, 'dd/MM/yyyy');

      this.curriculumService.createCurriculum(formData).subscribe(
        () => {
          alert('Currículo concluído com sucesso!');

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
        }
      );
    }
  }
}