import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})

export class CreateProjectComponent {

  constructor(private http:HttpClient){}

  onSubmit(data: {title: string}) {
    console.log(data);
    this.http.post('#', data)
    .subscribe((res) => {
      console.log(res)
    });
  }
}
