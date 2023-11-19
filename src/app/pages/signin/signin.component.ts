import { SigninService } from 'src/app/service/signin/signin.service';
import { Component } from '@angular/core';
import {Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account/account.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf, MatInputModule, MatFormFieldModule]
})
export class SigninComponent {
  signinForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private signinService: SigninService,
    private router:Router)
    {
      this.signinForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      });
    }

  ngOnInit() {
    if (this.accountService.LoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    if(this.signinForm.valid) {
      const params = this.signinForm.value;

      this.signinService.signinUser(params).subscribe(
        (resp: any) => {
        if(resp) {
          alert('Login realizado com sucesso!');

          window.localStorage.setItem('token', resp[0].token)
          window.localStorage.setItem('uuid', resp[0].uuid)
          window.localStorage.setItem('email', resp[0].email)
          window.localStorage.setItem('name', resp[0].name)

          this.router.navigate(['/home'])
          .then(() => {
            window.location.reload()
          })

        }
      },
        (error) => {
          if (error.status === 500) {
            alert('Erro interno do servidor. Usuário não encontrado.');
          } else {
            alert('Erro desconhecido. Por favor, tente novamente mais tarde.');
          }
        });
    } else {
      console.log('Erro ao enviar o formulário');
    }
  }
}

