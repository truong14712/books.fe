/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coupon } from '@core/interfaces/coupon';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private API_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getAllCoupon(): Observable<any> {
    return this.http.get(`${this.API_URL}/coupon`);
  }
  getOneCoupon(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/coupon/${id}`);
  }
  addCoupon(coupon: Coupon): Observable<any> {
    return this.http.post(`${this.API_URL}/coupon`, coupon);
  }
  updateCoupon(coupon: Coupon, id: string): Observable<any> {
    return this.http.patch(`${this.API_URL}/coupon/${id}`, coupon);
  }
  deleteCoupon(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/coupon/${id}`);
  }
  applyCoupon(coupon: any): Observable<any> {
    return this.http.post(`${this.API_URL}/coupon/applyCoupon`, coupon);
  }
}
