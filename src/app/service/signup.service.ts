import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public signupUser(formData: any) {
    const params = new HttpParams()
    .set('formData', formData)

    console.log(formData)
    console.log('/api/curriculum?' + params.toString)
    return this.httpClient.post('/api/curriculum?' + params.toString, {});

  }
}
