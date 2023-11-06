/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class StatisticalService {
  private API_URL: string = environment.apiUrl;
  constructor(private http: HttpClient) {}
  calculateRevenueByAuthor(): Observable<any> {
    return this.http.get(`${this.API_URL}/statistical/calculateRevenueByAuthor`);
  }
  calculateRevenueByCategory(): Observable<any> {
    return this.http.get(`${this.API_URL}/statistical/calculateRevenueByCategory`);
  }

  calculateTotalRevenue(query: string): Observable<any> {
    const [startDate, endDate] = query.split('-');
    const params = new HttpParams().set('startDate', startDate).set('endDate', endDate);
    return this.http.get(`${this.API_URL}/statistical/calculateTotalRevenue`, { params });
  }
  countRatingInOrders(): Observable<any> {
    return this.http.get(`${this.API_URL}/statistical/countRatingInOrders`);
  }
  totalOrder(): Observable<any> {
    return this.http.get(`${this.API_URL}/statistical/totalOrder`);
  }
}
