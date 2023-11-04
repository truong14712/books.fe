/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private API_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getAllOrder(): Observable<any> {
    return this.http.get(`${this.API_URL}/order`);
  }
  searchOrderUser(query: string): Observable<any> {
    const params = new HttpParams().set('_q', query);
    return this.http.get(`${this.API_URL}/order/searchOrderUser`, { params });
  }
  getAllOrderUser(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/order/getAllOrderUser/${id}`);
  }
  addOrder(body: any): Observable<any> {
    return this.http.post(`${this.API_URL}/order`, body);
  }
  getOneOrder(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/order/${id}`);
  }
  updateOrder(body: any, id: string): Observable<any> {
    return this.http.patch(`${this.API_URL}/order/${id}`, body);
  }
  restoreOrder(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/order/restoreOrder/${id}`);
  }
  cancelOrder(data: string, id: string): Observable<any> {
    return this.http.patch(`${this.API_URL}/order/cancelOrder/${id}`, data);
  }
  refundOrder(data: any, id: string): Observable<any> {
    return this.http.patch(`${this.API_URL}/order/refundOrder/${id}`, data);
  }
  refundOrderSuccess(body: any, id: string): Observable<any> {
    return this.http.patch(`${this.API_URL}/order/refundOrderSuccess/${id}`, body);
  }
}
