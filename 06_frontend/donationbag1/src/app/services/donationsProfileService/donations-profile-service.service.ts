import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodicElement } from '../../constants';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class DonationsProfileServiceService {
  private apiUrl = `${environment.apiUrl}/donor/getprofile`;
  // private apiUrl = 'http://localhost:3000/donor/getprofile';
  private bearerToken = localStorage.getItem('userToken');

  constructor(private http: HttpClient) { }

  getTableData(): Observable<PeriodicElement[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.bearerToken}`
    });

    return this.http.get<PeriodicElement[]>(this.apiUrl, { headers });
  }
}
