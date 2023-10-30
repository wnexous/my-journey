import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  
})
export class SigninComponent {
  constructor(private http:HttpClient){}

  onSubmit(data: {email: string, password: string}) {
    console.log(data);
    this.http.post('#', data)
    .subscribe((res) => {
      console.log(res)
    });
  }
}
