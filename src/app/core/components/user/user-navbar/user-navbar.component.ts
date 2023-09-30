import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@core/services/auth/auth.service';
import { ModelProfileComponent } from '../model-profile/model-profile.component';
import { Router } from '@angular/router';
import { BookService } from '@core/services/book/book.service';
import { ModelAccountComponent } from '../model-account/model-account.component';
import { CartService } from '@core/services/cart/cart.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css'],
})
export class UserNavbarComponent implements OnInit {
  user!: any;
  getUser: any = {};
  cartItemCount = 0;
  count = 0;
  @ViewChild('myInput', { static: false }) valueInput!: ElementRef;
  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private book: BookService,
    private cart: CartService,
    private cdr: ChangeDetectorRef,
  ) {}
  getValue() {
    const value = this.valueInput.nativeElement.value;
    if (value) {
      this.book.searchBook(value).subscribe((data) => {
        console.log(data);
      });
    }
  }
  ngOnInit() {
    this.getUser = this.auth.isAuthenticated();
    if (this.getUser) {
      this.user = JSON.parse(localStorage.getItem('user') || '');
      if (this.user) {
        this.updateCartItemCount();
      }
    } else {
      this.user = null;
    }
  }
  updateCartItemCount() {
    if (this.user) {
      this.cart.getCartById(this.user._id).subscribe(({ data }) => {
        const initialCount = data.books.length;
        this.cart.cartItemCount$.subscribe((count) => {
          if (data.books) {
            this.cartItemCount = initialCount;
          }
          this.cartItemCount = count || initialCount;
        });
      });
    }
  }
  openDialog() {
    this.dialog.open(ModelProfileComponent);
  }
  openModelAccount() {
    this.dialog.open(ModelAccountComponent);
  }
}
