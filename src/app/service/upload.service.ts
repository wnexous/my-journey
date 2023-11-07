import { HttpClient, HttpParams } from '@angular/common/http';
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

  return this.httpClient.post('api/project?' + params.toString, formData);
}

}