/* eslint-disable @typescript-eslint/no-explicit-any */
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '@core/interfaces/category';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private API_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getAllCategory(): Observable<any> {
    return this.http.get(`${this.API_URL}/category`);
  }
  getOneCategory(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/category/${id}`);
  }
  addCategory(category: Category): Observable<any> {
    return this.http.post(`${this.API_URL}/category`, category);
  }
  updateCategory(category: Category): Observable<any> {
    return this.http.put(`${this.API_URL}/category/${category._id}`, category);
  }
  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/category/${id}`);
  }
  getBooksByCategory(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/category/getBooksByCategory/${id}`);
  }
}
