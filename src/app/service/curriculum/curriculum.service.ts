import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {
  public curriculum: any

  constructor(private httpClient: HttpClient) {}

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
      .set('languages', query.languages);
  }

  public getUser(): Observable<any> {
    const params = this.params({ email: window.localStorage.getItem('email') });
    const httpOptions = { headers: this.headers(), params: params };

    return this.httpClient.get('http://localhost:5500/api/user', httpOptions);
  }

  public getCurriculum(): Observable<any> {
    const params = this.params({ email: window.localStorage.getItem('email') });
    const httpOptions = { headers: this.headers(), params: params };

    return this.httpClient.get('http://localhost:5500/api/curriculum', httpOptions);
  }

  public createCurriculum(query: any): Observable<any> {
    const params = this.params(query);
    const httpOptions = { headers: this.headers() };

    return this.httpClient.post('http://localhost:5500/api/curriculum?' + params.toString(), {}, httpOptions);
  }

  public deleteCurriculum(curriculumId: string) {
    console.log(curriculumId)

    const token = window.localStorage.getItem('token')
    const uuid: any = window.localStorage.getItem('uuid')

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token,
        'X-Request-Id': uuid,
      })
    };

    return this.httpClient.delete('http://localhost:5500/api/curriculum?id=' + curriculumId, httpOptions);
  }
}
