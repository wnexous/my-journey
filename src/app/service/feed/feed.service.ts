import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private httpClient: HttpClient) { }

  createMessage(message: string) {
    const params = new HttpParams()
    .set('message', message)

    const token = window.localStorage.getItem('token');
    const uuid: any = window.localStorage.getItem('uuid');
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token,
        'X-Request-Id': uuid,
      })
    };

    return this.httpClient.post('http://localhost:5500/api/feed?' + params.toString(), {}, httpOptions);
  }

  getMessages() {

    const token = window.localStorage.getItem('token');
    const uuid: any = window.localStorage.getItem('uuid');
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token,
        'X-Request-Id': uuid,
      })
    };

    return this.httpClient.get('http://localhost:5500/api/feed', httpOptions);
  }
}
