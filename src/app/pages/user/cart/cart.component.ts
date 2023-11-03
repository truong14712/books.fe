import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Book } from '@core/interfaces/book';
import { AuthService } from '@core/services/auth/auth.service';
import { CartService } from '@core/services/cart/cart.service';
import { preventAlphabetInput } from '@core/validation/noAlphabetValidation';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  listCart: any = [];
  listCartSelected: Book[] = [];
  selectedIds: string[] = [];
  totalPrice = 0;
  user!: any;
  quantity = 1;
  selectAllChecked = false;
  cartItemCount = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  totalPage!: number;
  currentPage = 1;
  itemsPerPage = 10;
  constructor(
    private cart: CartService,
    private auth: AuthService,
    private Router: Router,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.user = this.auth.isAuthenticated();
    if (!this.user) {
      this.Router.navigate(['buyer/login']);
    } else {
      this.cart.getCartById(this.user._id).subscribe(({ data }) => {
        if (data?.books?.length === 0) {
          this.listCart = data.books;
          this.cart.updateCartItemCount(data.books.length);
        } else {
          this.listCart = data?.books?.map((item: any) => {
            const existingBook = this.listCart.find((b: Book) => b._id === item.bookId._id);
            return {
              ...item.bookId,
              quantity: item.quantity,
              selected: existingBook ? existingBook.selected : false,
            };
          });
          this.totalPage = Math.ceil(this.listCart.length / this.itemsPerPage);
          this.cart.updateCartItemCount(data.books.length);
        }
      });
    }
  }
  handlePageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  roundPercentage(percentage: number) {
    return Math.round(percentage);
  }

  handleInput(event: KeyboardEvent) {
    preventAlphabetInput(event);
  }

  handleInputChange(event: Event, index: number) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    this.listCart[index].quantity = inputValue;
    this.quantity = parseInt(inputValue);
  }

  callApi(index: number) {
    const userId = this.user._id;
    const bookId = this.listCart[index]._id;
    const quantity = this.quantity;
    const book = this.listCart[index];
    const price = book.discountPrice === 0 ? book.price : book.discountPrice;
    const totalPrice = price * quantity;
    this.cart.updateCartItemQuantity({ userId, books: [{ bookId, quantity }] }).subscribe(() => {
      this.ngOnInit();
      if (book.selected) {
        this.totalPrice = totalPrice;
        this.cart.setTotalPrice(this.totalPrice);
      }
    });
  }

  inputBlur(event: Event, index: number) {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.callApi(index);
    }
  }

  decreaseQuantity(bookId: string) {
    const userId = this.user._id;
    const book = this.listCart.find((b: Book) => b._id === bookId);
    if (book && book.quantity > 1) {
      const price = book.discountPrice === 0 ? book.price : book.discountPrice;
      book.quantity -= 1;
      if (book.selected) {
        this.totalPrice -= price;
        this.cart.setTotalPrice(this.totalPrice);
      }
      this.cart
        .updateCart({
          userId,
          books: [
            {
              bookId: book._id,
              quantity: 1,
            },
          ],
        })
        .subscribe(() => {
          this.ngOnInit();
        });
    } else {
      this.handleDeleteBook(bookId);
    }
  }

  increaseQuantity(bookId: string) {
    const userId = this.user._id;
    const book = this.listCart.find((b: Book) => b._id === bookId);

    if (book && bookId) {
      const price = book.discountPrice === 0 ? book.price : book.discountPrice;
      book.quantity++;
      if (book.selected) {
        this.totalPrice += price;
        this.cart.setTotalPrice(this.totalPrice);
      }
      this.cart
        .createCart({
          userId,
          books: [
            {
              bookId: book._id,
              quantity: 1,
            },
          ],
        })
        .subscribe(() => {
          this.ngOnInit();
        });
    }
  }

  handleDeleteBook(id: string) {
    const userId = this.user._id;
    const confirmation = window.confirm('Do you want to delete it?');
    if (confirmation) {
      const book = this.listCart.find((book: Book) => book._id === id);
      this.listCartSelected = this.listCartSelected.filter((item: Book) => item._id !== id);
      this.cart.setCarts(this.listCartSelected);
      const price = book.discountPrice === 0 ? book.price : book.discountPrice;
      if (this.totalPrice !== 0) {
        this.totalPrice = this.totalPrice - price;
        this.cart.setTotalPrice(this.totalPrice);
      }
      const newBookInCart = this.listCart.filter((book: Book) => book._id !== id);

      const convertedArr = newBookInCart?.map((book: Book) => ({
        quantity: book.quantity,
        bookId: book._id,
      }));

      this.cart
        .updateInCart({
          userId,
          books: convertedArr,
        })
        .subscribe(
          (data) => {
            const {
              message,
              data: { books },
            } = data;
            this._snackBar.open(message, 'OK', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 2000,
            });
            this.cart.updateCartItemCount(books.length);
          },
          (error) => {
            this._snackBar.open(error.message, 'OK', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 2000,
            });
          },
        );
      this.listCart = newBookInCart;
    }
  }

  showD(discountPrice: number) {
    return discountPrice === 0 ? '₫' : null;
  }
  toggleSelectAll() {
    const newSelectedValue = this.selectAllChecked;
    for (const book of this.listCart) {
      book.selected = newSelectedValue;
    }
    if (!newSelectedValue) {
      this.totalPrice = 0;
      this.listCartSelected = [];
      this.selectedIds = [];
      this.cart.setCarts(this.listCartSelected);
      this.cart.setTotalPrice(this.totalPrice);
    } else {
      this.totalPrice = this.listCart.reduce((total: number, item: Book) => {
        const price = item.discountPrice === 0 ? item.price : item.discountPrice;
        const quantity = Number(item.quantity);
        const selected = item.selected ? 1 : -1;
        return total + price * quantity * selected;
      }, 0);
      this.listCartSelected = this.listCart.filter((item: Book) => item.selected);
      this.selectedIds = this.listCart.map((value: Book) => {
        return value._id;
      });
      this.cart.setCarts(this.listCartSelected);
      this.cart.setTotalPrice(this.totalPrice);
    }
  }
  handleCheckboxChange(book: Book) {
    const price = book.discountPrice === 0 ? book.price : book.discountPrice;
    const quantity = Number(book.quantity);

    if (book.selected) {
      this.totalPrice += price * quantity;
      this.listCartSelected.push(book);
      this.cart.setCarts(this.listCartSelected);
      this.cart.setTotalPrice(this.totalPrice);
    } else {
      this.totalPrice -= price * quantity;
      this.listCartSelected = this.listCartSelected.filter((item: Book) => item._id !== book._id);
      this.selectedIds = this.listCart.map((value: Book) => {
        return value._id;
      });
      this.cart.setCarts(this.listCartSelected);
      this.cart.setTotalPrice(this.totalPrice);
    }
    const anyCheckboxSelected = this.listCart.some((item: Book) => item.selected);
    this.selectAllChecked = anyCheckboxSelected;
  }

  handleCheckboxSelection(bookId: string, event: any) {
    const isChecked = event.target?.checked;
    if (isChecked) {
      this.selectedIds.push(bookId);
    } else {
      // Checkbox không được chọn
      const index = this.selectedIds.indexOf(bookId);
      if (index !== -1) {
        this.selectedIds.splice(index, 1); // Xóa bookId
      }
    }
  }
  selectAll() {
    this.selectAllChecked = !this.selectAllChecked;
    for (const book of this.listCart) {
      book.selected = this.selectAllChecked;
    }
    if (!this.selectAllChecked) {
      this.totalPrice = 0;
      this.listCartSelected = [];
      this.selectedIds = [];
      this.cart.setCarts(this.listCartSelected);
      this.cart.setTotalPrice(this.totalPrice);
    } else {
      this.totalPrice = this.listCart.reduce((total: number, item: Book) => {
        const price = item.discountPrice === 0 ? item.price : item.discountPrice;
        const quantity = Number(item.quantity);
        const selected = item.selected ? 1 : -1;
        return total + price * quantity * selected;
      }, 0);
      this.listCartSelected = this.listCart.filter((item: Book) => item.selected);
      this.selectedIds = this.listCart.map((value: Book) => {
        return value._id;
      });
      this.cart.setCarts(this.listCartSelected);
      this.cart.setTotalPrice(this.totalPrice);
    }
  }
  clearCart() {
    if (this.selectedIds.length > 0) {
      const confirm = window.confirm(`Bạn có muốn xóa ${this.selectedIds.length} sản phẩm không ?`);
      if (confirm) {
        this.cart.clearCarts(this.selectedIds).subscribe((data) => {
          const { message } = data;
          this._snackBar.open(message, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000,
          });
          this.ngOnInit();
        });
      }
    }
  }

  handleCheckout() {
    if (this.listCartSelected.length > 0) {
      this.Router.navigate(['/user/checkout']);
    } else {
      this._snackBar.open('Bạn vẫn chưa chọn sản phẩm nào để mua.', 'OK', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
}
