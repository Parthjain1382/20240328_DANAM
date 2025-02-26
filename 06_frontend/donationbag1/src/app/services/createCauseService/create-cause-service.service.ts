import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
@Injectable({
  providedIn: 'root'
})
export class CreateCauseServiceService {
  private apiUrl = `${environment.apiUrl}/org/cause`;
  private bearerToken = localStorage.getItem('orgToken');

  constructor(private http: HttpClient) { }

  createCause(causeData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.bearerToken}`
    });

    return this.http.post(this.apiUrl, causeData, { headers });
  }

}

