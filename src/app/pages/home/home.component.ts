import { Router } from '@angular/router';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Book } from '@core/interfaces/book';
import { Category } from '@core/interfaces/category';
import { BookService } from '@core/services/book/book.service';
import { CategoryService } from '@core/services/category/category.service';
import { EventService } from '@core/services/event/event.service';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '@core/services/cart/cart.service';
import { AuthService } from '@core/services/auth/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  listBook: Book[] = [];
  listCategory: Category[] = [];
  showOptions = false;
  isHighlighted = true;
  isBookLatest = false;
  isLoading = true;
  totalPage!: number;
  currentPage = 1;
  itemsPerPage = 20;
  listEvent: any[] = [];

  constructor(
    private book: BookService,
    private category: CategoryService,
    private event: EventService,
    private Router: Router,
    private _snackBar: MatSnackBar,
    private cart: CartService,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.category.getAllCategory().subscribe((data) => {
      this.listCategory = data.data.docs.length > 0 ? data.data.docs : [];
    });
    this.book.getAllBookIsHighlighted().subscribe((data) => {
      this.listBook = data.data.docs;
      this.totalPage = Math.ceil(this.listBook.length / this.itemsPerPage);
      this.isLoading = false;
    });
    this.event.getAllEvent().subscribe((data) => {
      this.listEvent = data.data.docs;
      // Lặp qua danh sách sự kiện và bắt đầu bộ đếm
      this.listEvent.map((value) => {
        if (value.status_Date === 'Đang chạy') {
          this.startCountdown(value.finish_Date);
        }
      });
      this.isLoading = false;
    });
  }
  handleListBookChange(listBook: Book[]) {
    this.listBook = listBook;
    this.totalPage = Math.ceil(this.listBook.length / this.itemsPerPage);
  }
  convertToRelativeTime(timestamp: string): string {
    const now = moment();
    const timeAgo = moment(timestamp);
    const duration = moment.duration(now.diff(timeAgo));
    const daysAgo = Math.floor(duration.asDays());
    return `${daysAgo} days ago`;
  }
  roundPercentage(percentage: number) {
    return Math.round(percentage);
  }

  handleOptionSorPrice(option: string) {
    const _sort = 'price';
    const ascend = 'ascend';
    const descend = 'descend';
    if (option === 'Giá: Thấp đến Cao') {
      this.router.navigate(['/'], {
        queryParams: { _sort, order: ascend },
      });
      this.book.sortBookPriceLatest(`${_sort}-${ascend}`).subscribe(({ data }: any) => {
        this.listBook = data.docs;
        this.totalPage = Math.ceil(this.listBook.length / this.itemsPerPage);
      });
    } else {
      this.router.navigate(['/'], {
        queryParams: { _sort, order: descend },
      });
      this.book.sortBookLatest(`${_sort}-${descend}`).subscribe(({ data }: any) => {
        this.listBook = data.docs;
        this.totalPage = Math.ceil(this.listBook.length / this.itemsPerPage);
      });
    }
  }
  handleSortBookLatest() {
    this.isHighlighted = false;
    this.isBookLatest = true;
    const _sort = 'createdAt';
    const descend = 'descend';
    this.router.navigate(['/'], {
      queryParams: { _sort, order: descend },
    });
    this.book.sortBookLatest(`${_sort}-${descend}`).subscribe(({ data }: any) => {
      this.listBook = data.docs;
      this.totalPage = Math.ceil(this.listBook.length / this.itemsPerPage);
    });
  }
  handleSortBookHightLight() {
    this.isHighlighted = true;
    this.isBookLatest = false;
    this.book.getAllBookIsHighlighted().subscribe(({ data }) => {
      this.listBook = data.docs;
      this.totalPage = Math.ceil(this.listBook.length / this.itemsPerPage);
    });
  }
  handlePageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }
  public countdown = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  private interval: any;
  startCountdown(finishDate: string) {
    const endDate = new Date(finishDate);
    this.interval = setInterval(() => {
      const timeDiff = endDate.getTime() - Date.now();
      let countdownSeconds = Math.ceil(timeDiff / 1000);

      if (countdownSeconds > 0) {
        this.countdown.days = Math.floor(countdownSeconds / 86400);
        this.countdown.hours = Math.floor((countdownSeconds % 86400) / 3600);
        this.countdown.minutes = Math.floor((countdownSeconds % 3600) / 60);
        this.countdown.seconds = Math.floor(countdownSeconds % 60);
        countdownSeconds--;
      } else {
        this.stopCountdown();
      }
    }, 1000);
  }
  stopCountdown() {
    clearInterval(this.interval);
  }
  showDetail(slug: string, id: string) {
    this.Router.navigate([`/book-detail/${slug}/${id}`]);
  }
  user: any;
  value = 1;

  addToCart(book: Book, bookId: string) {
    if (book.stock === 0) {
      this._snackBar.open(`${book.nameBook} đang hết hàng`, 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2000,
      });
      return;
    } else {
      this.user = this.auth.isAuthenticated();
      if (!this.user) {
        this.Router.navigate(['buyer/login']);
      } else {
        const { _id }: any = this.user;
        this.cart
          .createCart({
            userId: _id,
            books: [
              {
                bookId: bookId,
                quantity: this.value,
              },
            ],
          })
          .subscribe(
            (data) => {
              this._snackBar.open(`${data.message}`, 'OK', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 2000,
              });
              const { books } = data.data;
              this.cart.updateCartItemCount(books.length);
            },
            (error) => {
              this._snackBar.open(`${error.message}`, 'OK', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 2000,
              });
            },
          );
      }
    }
  }
}
