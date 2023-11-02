import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { Book } from '@core/interfaces/book';
import { BookService } from '@core/services/book/book.service';
import { CartService } from '@core/services/cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { Coupon } from '@core/interfaces/coupon';
import { CouponService } from '@core/services/coupon/coupon.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ModelShowVoucherComponent } from '@core/components/user/model-show-voucher/model-show-voucher.component';
import { preventAlphabetInput } from '@core/validation/noAlphabetValidation';
import { User } from '@core/interfaces/user';
import * as moment from 'moment';
import { rattingTypeDetailBook } from '@core/constants/rattingType';
import { ModelShowVoucherDetailComponent } from '@core/components/user/model-show-voucher-detail/model-show-voucher-detail.component';
import { ModelReportComponent } from '@core/components/user/model-report/model-report.component';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  listBook: Book[] = [];
  listBookCategory: Book[] = [];
  listBookAuthor: Book[] = [];
  book!: Book;
  description = '';
  selectedImage!: string;
  user!: User;
  hasBooksOfCategoryBeenCalled = false;
  showFullDescription = false;
  value = 1;
  count = 1;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  excludeKeys: string[] = [
    '_id',
    'discountPrice',
    'price',
    'images',
    'description',
    'categoryId',
    'status',
    'slug',
    'stock',
    'sold_out',
    'reviews',
    'createdAt',
    'updatedAt',
    '__v',
    'isHighlighted',
    'ratings',
  ];

  keyMappings: { [key: string]: string } = {
    nameBook: 'Tên Sách',
    isbn: 'Mã Sách',
    brand: 'Nhà cung cấp',
    auth: 'Tác Giả',
    publisher: 'Nhà Xuất Bản',
    publicationYear: 'Năm Xuất Bản',
    translator: 'Người Dịch',
    coverType: 'Hình Thức',
    language: 'Ngôn Ngữ',
    size: 'Kích Thước Bao Bì',
    weight: 'Trọng lượng (gr)',
    pageNumber: 'Số Trang',
  };

  valueMappings: { [key: string]: string } = {
    'Soft cover': 'Bìa mềm',
    Vietnamese: 'Tiếng việt',
    'Hard cover': 'Bìa cứng',
  };
  listCoupon: Coupon[] = [];
  rattingType = rattingTypeDetailBook;
  isLoading = true;
  originalReviews: any;
  totalPage!: number;
  currentPage = 1;
  itemsPerPage = 5;
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private Router: Router,
    private cart: CartService,
    private _snackBar: MatSnackBar,
    private coupon: CouponService,
    private dialog: MatDialog,
  ) {
    bookService.getAllBook().subscribe((data) => {
      this.listBook = data.data.docs;
      this.isLoading = false;
    });
    this.coupon.getAllCoupon().subscribe((data) => {
      this.listCoupon = data.data.docs;
      console.log(this.listCoupon);
      this.isLoading = false;
    });
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = String(params.get('id'));
      this.bookService.getOneBook(id).subscribe((data) => {
        this.book = data.data;
        this.description = this.book.description;
        this.isLoading = false;
        this.originalReviews = [...this.book.reviews];
        this.totalPage = Math.ceil(this.book.reviews.length / this.itemsPerPage);
      });
    });
  }
  openShowVoucher() {
    this.dialog.open(ModelShowVoucherComponent);
  }
  calculatePercentage() {
    const percentage = ((this.book.price - this.book.discountPrice) / this.book.price) * 100;
    return Math.round(percentage);
  }

  roundPercentage(percentage: number) {
    return Math.round(percentage);
  }

  booksOfCategory() {
    if (this.book.categoryId._id) {
      this.isLoading = false;
      const bookCategory = this.listBook.filter(
        (book) => book.categoryId?._id === this.book.categoryId?._id && book._id !== this.book._id,
      );
      this.hasBooksOfCategoryBeenCalled = true;
      this.listBookCategory = bookCategory;
    }
  }

  booksOfAuthor() {
    if (this.book.auth) {
      const bookAuthor = this.listBook.filter((book) => book.auth === this.book.auth && book._id !== this.book._id);
      this.listBookAuthor = bookAuthor;
    }
  }

  objectEntries(obj: any): [string, any][] {
    return Object.entries(obj);
  }

  decreaseQuantity() {
    if (this.value > 1) this.value -= 1;
  }
  increaseQuantity() {
    this.value += 1;
  }
  handleInput(event: KeyboardEvent) {
    preventAlphabetInput(event);
  }
  addToCart(stock: number, bookId: string) {
    if (stock === 0) {
      this._snackBar.open(`${this.book.nameBook} đang hết hàng`, 'OK', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
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
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 2000,
              });
              const { books } = data.data;
              this.cart.updateCartItemCount(books.length);
            },
            (error) => {
              this._snackBar.open(`${error.message}`, 'OK', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 2000,
              });
            },
          );
      }
    }
  }
  getStarArray(ratings: number): number[] {
    return Array(ratings).fill({});
  }
  formatDate(date: string) {
    return moment(date).format('HH:mm DD-MM-YYYY');
  }

  getRatingsCountForStars(stars: any) {
    if (stars !== 'Tất cả') {
      let count = 0;
      for (const review of this.originalReviews) {
        if (review.rating === stars) {
          count++;
        }
      }
      if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'k';
      } else {
        return count.toString();
      }
    } else {
      return null;
    }
  }
  handleClick(selectedValue: any) {
    if (selectedValue !== 'Tất cả') {
      const body = {
        rating: selectedValue,
        bookId: this.book._id,
      };
      for (const item of this.rattingType) {
        item.selected = item.value === selectedValue;
      }
      this.bookService.searchProductReviewsAllUsers(body).subscribe(({ data }: any) => {
        this.book.reviews = data;
        this.totalPage = Math.ceil(this.book.reviews.length / this.itemsPerPage);
      });
    } else {
      for (const item of this.rattingType) {
        item.selected = item.value === selectedValue;
      }
      this.ngOnInit();
    }
  }
  handlePageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }
  showOriginalReviews() {
    return this.originalReviews.length > 0 ? this.originalReviews.length : 0;
  }
  handleVoucherDetail(id: string) {
    this.dialog.open(ModelShowVoucherDetailComponent, {
      data: { id },
    });
  }
  handleReport(bookId: string, userId: any, comment: string) {
    this.dialog.open(ModelReportComponent, {
      data: { bookId, userId, comment },
    });
  }
}
