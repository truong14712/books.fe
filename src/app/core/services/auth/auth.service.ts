/* eslint-disable @typescript-eslint/no-explicit-any */
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, changeInformation, changePassword } from '@core/interfaces/user';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {}
  Register(user: User): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/register`, user);
  }

  Login(user: User): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/login`, user);
  }

  activation(activation_token: string): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/activation`, { activation_token });
  }

  isAuthenticated() {
    return JSON.parse(localStorage.getItem('user')!) || null;
  }

  logout(): Observable<any> {
    return this.http.get(`${this.API_URL}/auth/logout`);
  }

  changeInformation(data: changeInformation) {
    return this.http.put(`${this.API_URL}/auth/changeInformation`, data);
  }

  changeAvatar(data: any) {
    return this.http.put(`${this.API_URL}/auth/changeAvatar`, data);
  }

  changePassword(data: changePassword) {
    return this.http.put(`${this.API_URL}/auth/changePassword`, data);
  }

  setToken(token: string) {
    return localStorage.setItem('accessToken', JSON.stringify(token));
  }

  getToken() {
    return JSON.parse(localStorage.getItem('accessToken')!) || {};
  }

  setUser(user: User) {
    return localStorage.setItem('user', JSON.stringify(user));
  }

  updateAddress(data: any) {
    return this.http.put(`${this.API_URL}/auth/updateAddress`, data);
  }

  deleteAddress(id: string) {
    return this.http.delete(`${this.API_URL}/auth/deleteAddress/${id}`);
  }
}
