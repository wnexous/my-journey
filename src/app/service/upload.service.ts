import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
@Injectable({
 providedIn: 'root'
})
export class UploadService {
 
 constructor(
   private httpClient: HttpClient,
 ) { }
 
 public uploadFile(title: string, description: string, file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const params = new HttpParams()
  .set('title', title)
  .set('description', description);

  const token = window.localStorage.getItem('token')
  const uuid: any = window.localStorage.getItem('uuid')

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + token,
      'X-Request-Id': uuid
    })
  };

  return this.httpClient.post('http://localhost:5500/api/project?' + params.toString(), formData, httpOptions);
}

}