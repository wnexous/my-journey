import { SignupService } from './../../service/signup.service';
import { Component } from '@angular/core';
import {Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf, MatInputModule, MatFormFieldModule]
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignupService)
    {
      this.signupForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      });
    }

  onSubmit() {
    if(this.signupForm.valid) {
      const params = this.signupForm.value;

      this.signupService.signupUser(params).subscribe((resp) => {
        alert('Formulário enviado');
      });
    } else {
      console.log("Erro ao enviar");
    }
  }
}
