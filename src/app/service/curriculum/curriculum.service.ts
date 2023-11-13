import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {

  constructor(
    private httpClient: HttpClient,
  ) { }


  public getCurriculum() {
    const token = window.localStorage.getItem('token');
    const uuid: any = window.localStorage.getItem('uuid');
    const email: any = window.localStorage.getItem('email');

    const params = new HttpParams()
    .set('email', email)

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'X-Request-Id': uuid
      }),
      params: params, // Não é necessário chamar toString() aqui
    };

    return this.httpClient.get('http://localhost:5500/api/curriculum', httpOptions);
  }

    public createCurriculum(query: any) {
      const params = new HttpParams()
      .set('name', query.name)
      .set('email', query.email)
      .set('phoneNumber', query.phoneNumber)
      .set('birthDate', query.birthDate)
      .set('street', query.street)
      .set('streetNumber', query.streetNumber)
      .set('district', query.district)
      .set('city', query.city)
      .set('state', query.state)
      .set('professionalObjective', query.professionalObjective)
      .set('professionalExperience', query.professionalExperience)
      .set('coursesAndCertifications', query.coursesAndCertifications)
      .set('languages', query.languages)

      const token = window.localStorage.getItem('token')
      const uuid: any = window.localStorage.getItem('uuid')
    
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + token,
          'X-Request-Id': uuid
        })
      };
  
      console.log('/api/curriculum?' + params.toString())
      return this.httpClient.post('http://localhost:5500/api/curriculum?' + params.toString(), {}, httpOptions);
  
    }
}