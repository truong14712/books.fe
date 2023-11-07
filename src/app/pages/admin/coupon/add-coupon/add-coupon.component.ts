import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Coupon } from '@core/interfaces/coupon';
import { CouponService } from '@core/services/coupon/coupon.service';
import { noWhitespaceValidator } from '@core/validation/noWhitespaceValidator';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css'],
})
export class AddCouponComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private FormBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private coupon: CouponService,
  ) {}
  myForm = this.FormBuilder.group({
    code: ['', [Validators.required, noWhitespaceValidator]],
    discount: [0, [Validators.required, noWhitespaceValidator, Validators.maxLength(3)]],
    expirationDate: ['', [Validators.required]],
    description: ['', [Validators.required]],
    minAmount: [0, [Validators.required, noWhitespaceValidator]],
    quantity: [0, [Validators.required, noWhitespaceValidator]],
  });
  ngOnInit() {}
  onSubmit() {
    const data: any = {
      code: this.myForm.value.code,
      discount: this.myForm.value.discount,
      expirationDate: this.myForm.value.expirationDate,
      description: this.myForm.value.description,
      minAmount: this.myForm.value.minAmount,
      quantity: this.myForm.value.quantity,
    };
    this.coupon.addCoupon(data).subscribe(
      (data: { message: string; data: Coupon; isSuccess: boolean; status: boolean }) => {
        this._snackBar.open(`${data.message}`, 'OK', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.router.navigate(['admin/coupon']);
      },
      (error) => {
        this._snackBar.open(`${error.message}`, 'OK', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      },
    );
  }
}
