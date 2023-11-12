import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@core/services/auth/auth.service';
import { ModelProfileComponent } from '../model-profile/model-profile.component';
import { BookService } from '@core/services/book/book.service';
import { ModelAccountComponent } from '../model-account/model-account.component';
import { CartService } from '@core/services/cart/cart.service';
import { Book } from '@core/interfaces/book';
import { User } from '@core/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css'],
})
export class UserNavbarComponent implements OnInit {
  getUser!: any;
  cartItemCount = 0;
  count = 0;
  dataSearch: Book[] = [];
  inputValue = '';
  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private book: BookService,
    private cart: CartService,
    private router: Router,
  ) {}
  getValue(value: string) {
    const query = value.trim();
    this.inputValue = query;
    if (this.inputValue) {
      this.book.searchBook(value).subscribe(({ data }) => {
        this.dataSearch = data;
      });
    } else {
      this.inputValue = '';
      this.dataSearch = [];
    }
  }
  handleItemClick() {
    this.dataSearch = [];
    if (this.inputValue) {
      this.inputValue = '';
    }
  }
  ngOnInit() {
    this.getUser = this.auth.isAuthenticated();

    if (this.getUser) {
      this.updateCartItemCount();
    } else {
      this.getUser = null;
    }
  }
  updateCartItemCount() {
    if (this.getUser) {
      this.cart.getCartById(this.getUser._id).subscribe(({ data }) => {
        const initialCount = data.books?.length;
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
