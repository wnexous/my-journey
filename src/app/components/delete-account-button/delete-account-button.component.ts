import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { SignupService } from 'src/app/service/signup/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-account-button',
  templateUrl: './delete-account-button.component.html',
  styleUrls: ['./delete-account-button.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
})
export class DeleteAccountButtonComponent {

  constructor(
    private signupService: SignupService,
    private router: Router,
  ){}

  deleteAccount() {
    const isConfirmed = window.confirm('Tem certeza de que deseja excluir esta conta? Não será possível recuperar seus dados.');

    if(isConfirmed) {
      this.signupService.deleteUser().subscribe(
        () => {
          window.localStorage.clear();
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        },
        (error) => {
          console.error('Erro ao excluir a conta:', error);
        }
      )
    }
  }

}
