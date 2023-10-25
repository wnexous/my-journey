import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(private http:HttpClient){}

  onSubmit(data: {name: string, email: string, password: string}) {
    console.log(data);
    this.http.post('#', data)
    .subscribe((res) => {
      console.log(res)
    });
  }
}
