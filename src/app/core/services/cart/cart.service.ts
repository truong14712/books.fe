/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '@core/interfaces/cart';
import { BehaviorSubject } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { Book } from '@core/interfaces/book';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private API_URL: string = environment.apiUrl;
  private cartItemCount = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCount.asObservable();
  private secretKey: string = environment.secretKey;

  constructor(private http: HttpClient) {}
  updateCartItemCount(itemCount: number) {
    this.cartItemCount.next(itemCount);
  }
  getAllCart(): Observable<any> {
    return this.http.get(`${this.API_URL}/cart`);
  }

  getCartById(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/cart/${id}`);
  }

  createCart(cart: Cart): Observable<any> {
    return this.http.post(`${this.API_URL}/cart`, cart);
  }
  updateCartItemQuantity(cart: Cart): Observable<any> {
    return this.http.post(`${this.API_URL}/cart/updateCartItemQuantity`, cart);
  }
  updateCart(cart: Cart): Observable<any> {
    return this.http.post(`${this.API_URL}/cart/update`, cart);
  }
  updateInCart(cart: Cart): Observable<any> {
    return this.http.patch(`${this.API_URL}/cart/updateInCart`, cart);
  }
  clearCarts(id: any): Observable<any> {
    return this.http.post(`${this.API_URL}/cart/clearCarts`, id);
  }

  deleteCart(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/cart/${id}`);
  }
  setTotalPrice(price: number) {
    const encryptedPrice = CryptoJS.AES.encrypt(JSON.stringify(price), this.secretKey).toString();
    localStorage.setItem('totalPrice', encryptedPrice);
  }
  getTotalPrice() {
    const encryptedData = localStorage.getItem('totalPrice');
    if (!encryptedData) {
      return null;
    } else {
      try {
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
        const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
      } catch (error) {
        return null;
      }
    }
  }
  setCarts(cart: Book[]) {
    const encryptedCart = CryptoJS.AES.encrypt(JSON.stringify(cart), this.secretKey).toString();
    localStorage.setItem('totalCart', JSON.stringify(encryptedCart));
  }
  getCarts() {
    const cipherText = JSON.parse(localStorage.getItem('totalCart')!);
    const bytes = CryptoJS.AES.decrypt(cipherText, this.secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }
}
