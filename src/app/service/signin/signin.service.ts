import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(
    private httpClient: HttpClient,
  ) { }
  public signinUser(query: any) {
    const params = new HttpParams()
    .set('email', query.email)
    .set('password', query.password)

    return this.httpClient.post('http://localhost:5500/api/login?' + params.toString(), {});
  }
}
