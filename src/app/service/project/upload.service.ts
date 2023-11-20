import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
@Injectable({
 providedIn: 'root'
})
export class UploadService {
 
 constructor(
   private httpClient: HttpClient,
 ) { }

 public getAllProjects() {
  const token = window.localStorage.getItem('token')
  const uuid: any = window.localStorage.getItem('uuid')

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + token,
      'X-Request-Id': uuid,
    })
  };

  return this.httpClient.get('http://localhost:5500/api/project?', httpOptions);
 }

 public getProject() {
  const email: any = window.localStorage.getItem('email')
  const token = window.localStorage.getItem('token')
  const uuid: any = window.localStorage.getItem('uuid')

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + token,
      'X-Request-Id': uuid,
    })
  };

  const params = new HttpParams()
  .set('email', email)

  return this.httpClient.get('http://localhost:5500/api/project?' + params.toString(), httpOptions);
}
 
 public uploadFile(title: string, description: string, image: string) {

  const params = new HttpParams()
  .set('title', title)
  .set('description', description)

  const token = window.localStorage.getItem('token')
  const uuid: any = window.localStorage.getItem('uuid')

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + token,
      'X-Request-Id': uuid,
    })
  };

  return this.httpClient.post('http://localhost:5500/api/project?' + params.toString(), image, httpOptions);
}

public updateFile(title: string, description: string, image: string) {

  const params = new HttpParams()
  .set('title', title)
  .set('description', description)

  const token = window.localStorage.getItem('token')
  const uuid: any = window.localStorage.getItem('uuid')

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + token,
      'X-Request-Id': uuid,
    })
  };

  if (!image) {
    // Um arquivo de imagem foi carregado
    image = window.localStorage.getItem('image') || ''
  }

  return this.httpClient.post('http://localhost:5500/api/project?' + params.toString(), image, httpOptions);

}

public deleteFile(projectId: string) {

  const token = window.localStorage.getItem('token')
  const uuid: any = window.localStorage.getItem('uuid')

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + token,
      'X-Request-Id': uuid,
    })
  };

  return this.httpClient.delete('http://localhost:5500/api/project?id=' + projectId, httpOptions)
}

}