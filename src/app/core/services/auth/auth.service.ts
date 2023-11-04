/* eslint-disable @typescript-eslint/no-explicit-any */
import { environment } from 'src/app/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Addresses, User, changeInformation, changePassword } from '@core/interfaces/user';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL: string = environment.apiUrl;
  private secretKey: string = environment.secretKey;

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
    const cipherText = localStorage.getItem('user');
    if (!cipherText) {
      return null;
    }
    try {
      const bytes = CryptoJS.AES.decrypt(cipherText, this.secretKey);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData;
    } catch (error) {
      return null;
    }
  }

  logout(): Observable<any> {
    localStorage.clear();
    return this.http.get(`${this.API_URL}/auth/logout`);
  }
  getOne(id: any): Observable<any> {
    return this.http.get(`${this.API_URL}/auth/${id}`);
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
    const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(token), this.secretKey).toString();
    localStorage.setItem('accessToken', encryptedUser);
  }

  getToken() {
    const cipherText = localStorage.getItem('accessToken');
    if (!cipherText) {
      return null;
    }
    try {
      const bytes = CryptoJS.AES.decrypt(cipherText, this.secretKey);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData;
    } catch (error) {
      return null;
    }
  }

  setUser(user: User) {
    const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(user), this.secretKey).toString();
    localStorage.setItem('user', encryptedUser);
  }

  refreshToken(data: any) {
    return this.http.post(`${this.API_URL}/auth/refreshToken`, data);
  }

  addAddress(data: Addresses) {
    return this.http.patch(`${this.API_URL}/auth/addAddress`, data);
  }
  updateAddress(data: any) {
    return this.http.patch(`${this.API_URL}/auth/updateAddress`, data);
  }
  changeAddressStatus(data: { addressId: string; status: boolean }) {
    return this.http.patch(`${this.API_URL}/auth/changeAddressStatus`, data);
  }

  deleteAddress(id: string) {
    return this.http.delete(`${this.API_URL}/auth/deleteAddress/${id}`);
  }

  getAllUser() {
    return this.http.get(`${this.API_URL}/auth/`);
  }

  getOneUser(id: string) {
    return this.http.get(`${this.API_URL}/auth/${id}`);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.API_URL}/auth/${id}`);
  }

  forgotPassword(body: any) {
    return this.http.post(`${this.API_URL}/auth/forgotPassword`, body);
  }
  resetPassword(id: string, data: any) {
    return this.http.patch(`${this.API_URL}/auth/resetPassword/${id}`, data);
  }
  loginSuccessGoogle(data: any) {
    return this.http.post(`${this.API_URL}/auth/login-success-google`, data);
  }
  loginSuccessFacebook(data: any) {
    return this.http.post(`${this.API_URL}/auth/login-success-facebook`, data);
  }
}
