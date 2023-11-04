/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  getAllPublishers(): Observable<any> {
    return this.http.get(`${this.API_URL}/book/getAllPublishers`);
  }
  getAllCoverType(): Observable<any> {
    return this.http.get(`${this.API_URL}/book/getAllCoverType`);
  }
  getAllAuth(): Observable<any> {
    return this.http.get(`${this.API_URL}/book/getAllAuth`);
  }
  getAllBookIsHighlighted(): Observable<any> {
    return this.http.get(`${this.API_URL}/book/getAllIsHighlighted`);
  }
  getOneBook(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/book/${id}`);
  }
  addBook(book: Book): Observable<any> {
    return this.http.post(`${this.API_URL}/book`, book);
  }
  updateBook(book: Book, id: string): Observable<any> {
    return this.http.put(`${this.API_URL}/book/${id}`, book);
  }
  deleteBook(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/book/${id}`);
  }
  searchBook(query: string): Observable<any> {
    const params = new HttpParams().set('_q', query);
    return this.http.get(`${this.API_URL}/book/search`, { params });
  }
  searchPrice(query: string): Observable<any> {
    const [minPrice, maxPrice] = query.split('-');
    const params = new HttpParams().set('minPrice', minPrice).set('maxPrice', maxPrice);
    return this.http.get(`${this.API_URL}/book/searchPrice`, { params });
  }
  searchPublisherName(query: string): Observable<any> {
    const params = new HttpParams().set('_q', query);
    return this.http.get(`${this.API_URL}/book/searchPublisherName`, { params });
  }
  searchAuthName(query: string): Observable<any> {
    const params = new HttpParams().set('_q', query);
    return this.http.get(`${this.API_URL}/book/searchAuthName`, { params });
  }
  searchCoverType(query: string): Observable<any> {
    const params = new HttpParams().set('_q', query);
    return this.http.get(`${this.API_URL}/book/searchCoverType`, { params });
  }
  sortBookLatest(query: string) {
    // sort createdAt order descend
    const [_sort, _order] = query.split('-');
    const params = new HttpParams().set('_sort', _sort).set('_order', _order);
    return this.http.get(`${this.API_URL}/book`, { params });
  }
  sortBookPriceLatest(query: string) {
    // sort price and order descend ascend
    const [_sort, _order] = query.split('-');
    const params = new HttpParams().set('_sort', _sort).set('_order', _order);
    return this.http.get(`${this.API_URL}/book`, { params });
  }
  createNewReview(data: any) {
    return this.http.patch(`${this.API_URL}/book/createNewReview`, data);
  }
  searchProductReviewsAllUsers(data: any) {
    return this.http.post(`${this.API_URL}/book/searchProductReviewsAllUsers`, data);
  }
}
