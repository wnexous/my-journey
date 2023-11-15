import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
@Injectable({
 providedIn: 'root'
})
export class UploadService {
 
 constructor(
   private httpClient: HttpClient,
 ) { }

 private headers(): HttpHeaders {
  const token = window.localStorage.getItem('token');
  const uuid: any = window.localStorage.getItem('uuid');
  
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
    'X-Request-Id': uuid
  });
}

private params(query: any): HttpParams {
  return new HttpParams()
  .set('title', query.title)
  .set('description', query.description)
}

 public getProject() {
  const params = this.params({ email: window.localStorage.getItem('email') });
  const httpOptions = { headers: this.headers(), params: params };

  return this.httpClient.get('http://localhost:5500/api/project', httpOptions);
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

  console.log({
    title,
    description,
    image
  })

  console.log('AQUI :D')

  return this.httpClient.post('http://localhost:5500/api/project?' + params.toString(), image, httpOptions);

}

public deleteFile() {

  const token = window.localStorage.getItem('token')
  const uuid: any = window.localStorage.getItem('uuid')
  const projectId = window.localStorage.getItem('projectId')

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