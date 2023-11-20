import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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

  public deleteUser() {
    const token = window.localStorage.getItem('token')
    const uuid: any = window.localStorage.getItem('uuid')
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token,
        'X-Request-Id': uuid,
      })
    };

    return this.httpClient.delete('http://localhost:5500/api/user', httpOptions)
  }
}
