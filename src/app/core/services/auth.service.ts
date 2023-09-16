import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environment.development';
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
    console.log(activation_token);
    return this.http.post(`${this.API_URL}/auth/activation`, { activation_token });
  }
}
