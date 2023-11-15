/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private API_URL: string = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getAllEvent(): Observable<any> {
    return this.http.get(`${this.API_URL}/event`);
  }
  getOneEvent(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/event/${id}`);
  }
  addEvent(event: any): Observable<any> {
    return this.http.post(`${this.API_URL}/event`, event);
  }
  updateEvent(event: any, id: string): Observable<any> {
    return this.http.put(`${this.API_URL}/event/${id}`, event);
  }
  deleteEvent(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/event/${id}`);
  }
}
