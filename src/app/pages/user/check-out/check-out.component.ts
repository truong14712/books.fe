import { Addresses, User } from '@core/interfaces/user';
import { AuthService } from '@core/services/auth/auth.service';
import { Book } from '@core/interfaces/book';
import { CartService } from '@core/services/cart/cart.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CouponService } from '@core/services/coupon/coupon.service';
import { environment } from 'src/app/environments/environment.development';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ModelAddressComponent } from '@core/components/user/model-address/model-address.component';
import { ModelShowVoucherComponent } from '@core/components/user/model-show-voucher/model-show-voucher.component';
import { OrderService } from '@core/services/order/order.service';
import { paymentMethods } from '@core/constants/paymentMethods';
import { Router } from '@angular/router';
import { truncateString } from '@core/utils/truncateString';

declare let paypal: any;

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit {
  user!: User;
  listCart: Book[] = [];
  addresses!: Addresses[];
  voucher!: string;
  totalAmount!: number;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  paymentMethods = paymentMethods;
  payment!: any;
  totalPrice!: number;
  address!: any;
  private API_URL: string = environment.apiUrl;

  constructor(
    private cart: CartService,
    private auth: AuthService,
    private order: OrderService,
    private dialog: MatDialog,
    private coupon: CouponService,
    private _snackBar: MatSnackBar,
    private route: Router,
  ) {}
  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;
  async ngOnInit() {
    this.user = this.auth.isAuthenticated();
    this.listCart = this.cart.getCarts();
    const cart = this.listCart.map((value) => {
      return {
        ...value,
        ratings: 0,
      };
    });
    this.listCart = cart;
    console.log(this.listCart);
    this.addresses = this.user.addresses;
    this.totalAmount = this.cart.getTotalPrice();
  }
  loadPayPalScript() {
    if (paypal) {
      paypal
        .Buttons({
          style: {
            shape: 'rect',
            color: 'gold',
            layout: 'vertical',
            label: 'paypal',
          },
          createOrder: async () => {
            const cart = this.listCart;
            const response = await fetch(`${this.API_URL}/paypal/create_order`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
              body: JSON.stringify({
                items: cart.map((book: Book) => {
                  return {
                    name: book.nameBook,
                    quantity: book.quantity,
                    unit_amount: {
                      currency_code: 'USD',
                      value: book.discountPrice === 0 ? String(book.price) : String(book.discountPrice),
                    },
                  };
                }),
                totalPrice: this.totalAmount,
                intent: 'capture',
              }),
            });
            const order = await response.json();
            return order.id;
          },
          onApprove: async (data: any, actions: any) => {
            const { listCart, API_URL, payment, user } = this;
            const cart = listCart;
            const orderId = data.orderID;

            try {
              const response = await fetch(`${API_URL}/paypal/success_order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                body: JSON.stringify({
                  intent: 'capture',
                  orderId,
                  cart,
                  paymentInfo: {
                    type: payment,
                    status: 'Thành công',
                  },
                  userId: user._id,
                }),
              });
              const order_details = await response.json();
              if (order_details.status === 'COMPLETED') {
                const { _snackBar, horizontalPosition, verticalPosition } = this;
                const intent_object = 'captures';
                _snackBar.open(
                  `Cám ơn` +
                    order_details.payer.name.given_name +
                    ` ` +
                    order_details.payer.name.surname +
                    `cho khoản thanh toán của bạn ` +
                    order_details.purchase_units[0].payments[intent_object][0].amount.value +
                    ` ` +
                    order_details.purchase_units[0].payments[intent_object][0].amount.currency_code,
                  'OK',
                  {
                    duration: 2000,
                    horizontalPosition,
                    verticalPosition,
                  },
                );
                const transaction = order_details.purchase_units[0].payments.captures[0];
                this.paypalRedirect(transaction.status);
              }
              paypal.close();
            } catch (error) {
              const { _snackBar, horizontalPosition, verticalPosition } = this;
              _snackBar.open(`Đơn hàng bị lỗi vui lòng kiểm tra lại`, 'OK', {
                duration: 2000,
                horizontalPosition,
                verticalPosition,
              });
            }
          },
          onCancel: () => {
            const { _snackBar, horizontalPosition, verticalPosition } = this;
            _snackBar.open(`Đơn đặt hàng đã bị hủy`, 'OK', {
              duration: 2000,
              horizontalPosition,
              verticalPosition,
            });
          },
          onError: (err: any) => {
            console.log(err);
          },
        })
        .render(this.paymentRef.nativeElement);
    }
  }
  paypalRedirect(status: string) {
    const { route } = this;
    switch (status) {
      case 'COMPLETED':
        route.navigate(['/user/purchase/']);
        break;
      case 'ERROR':
        route.navigate(['/result/error/']);
        break;
      default:
        route.navigate(['/result/error/']);
        break;
    }
  }
  onPaymentChange() {
    this.payment;
    if (this.payment === 'Thanh toán qua ví paypal') {
      this.loadPayPalScript();
    } else {
      this.paymentRef.nativeElement.innerHTML = '<div #paymentRef></div>';
    }
  }
  truncateString(str: string, maxLength: number) {
    return truncateString(str, maxLength);
  }
  openAddress() {
    const dialogRef = this.dialog.open(ModelAddressComponent);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.auth.setUser(data);
        this.ngOnInit();
      }
    });
  }
  handleInput(event: Event) {
    const inputValue = (event.target as HTMLSelectElement).value.trim();
    this.voucher = inputValue;
  }
  handleVoucher() {
    if (this.voucher) {
      const voucher = {
        totalAmount: this.totalAmount,
        code: this.voucher,
      };
      this.coupon.applyCoupon(voucher).subscribe(
        (data) => {
          this.cart.setTotalPrice(data.data);
          this._snackBar.open(`${data.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000,
          });
          this.ngOnInit();
        },
        ({ error }) => {
          this._snackBar.open(`${error.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000,
          });
        },
      );
    } else {
      this._snackBar.open(`Vui lòng nhập một code`, 'OK', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
  openShowVoucher() {
    this.dialog.open(ModelShowVoucherComponent);
  }
  findSelectedAddress() {
    return this.addresses.find((item) => item.status === true);
  }
  handleOder() {
    if (!this.payment) {
      this._snackBar.open(`Vui lòng nhập phương thức thanh toán`, 'OK', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    if (this.payment === 'Thanh toán khi nhận hàng') {
      const ids = this.listCart.map((item: Book) => item._id);
      this.address = this.findSelectedAddress();
      this.totalAmount = this.cart.getTotalPrice();
      const order = {
        userId: this.user._id,
        shippingAddress: this.address,
        paymentInfo: {
          type: this.payment,
        },
        totalPrice: this.totalAmount,
        cart: this.listCart,
      };
      if (this.address === undefined) {
        this._snackBar.open(`Vui lòng nhập địa chỉ`, 'OK', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        return;
      }
      this.order.addOrder(order).subscribe(
        (data) => {
          this._snackBar.open(`${data.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000,
          });
          const id: string = this.user?._id ?? '';
          this.cart.clearCarts(ids).subscribe(() => {
            this.cart.getCartById(id).subscribe(({ data }) => {
              this.cart.updateCartItemCount(data.books.length);
              this.route.navigate(['/user/purchase']);
            });
          });
        },
        ({ error }) => {
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
