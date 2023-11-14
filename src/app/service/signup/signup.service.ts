import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public signupUser(query: any) {
    const params = new HttpParams()
    .set('name', query.name)
    .set('email', query.email)
    .set('password', query.password)

    console.log('/api/user?' + params.toString())
    return this.httpClient.post('http://localhost:5500/api/user?' + params.toString(), {});

  }
}
