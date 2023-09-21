/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Category } from '@core/interfaces/category';
import { Observable } from 'rxjs';
import { Book } from '@core/interfaces/book';
@Injectable({
  providedIn: 'root',
})
export class BookService {
  private API_URL: string = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getAllBook(): Observable<any> {
    return this.http.get(`${this.API_URL}/book`);
  }
  getOneBook(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/book/${id}`);
  }
  addBook(book: Book): Observable<any> {
    return this.http.post(`${this.API_URL}/book`, book);
  }
  updateBook(book: Book, id: string): Observable<any> {
    console.log(book);
    return this.http.put(`${this.API_URL}/book/${id}`, book);
  }
  deleteBook(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/book/${id}`);
  }
}
