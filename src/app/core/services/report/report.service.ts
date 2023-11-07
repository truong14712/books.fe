/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private API_URL: string = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getAllReport(): Observable<any> {
    return this.http.get(`${this.API_URL}/report`);
  }
  getOneReport(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/report/${id}`);
  }
  addReport(report: any): Observable<any> {
    return this.http.post(`${this.API_URL}/report`, report);
  }
  deleteReport(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/report/${id}`);
  }
  deleteReview(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/report/deleteReview/${id}`);
  }
}
