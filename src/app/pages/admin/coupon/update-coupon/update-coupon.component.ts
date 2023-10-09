import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Coupon } from '@core/interfaces/coupon';
import { CouponService } from '@core/services/coupon/coupon.service';
import * as moment from 'moment';

@Component({
  selector: 'app-update-coupon',
  templateUrl: './update-coupon.component.html',
  styleUrls: ['./update-coupon.component.css'],
})
export class UpdateCouponComponent implements OnInit {
  constructor(
    private FormBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private coupon: CouponService,
    private ActivatedRoute: ActivatedRoute,
  ) {}
  newCoupon!: Coupon;
  myForm = this.FormBuilder.group({
    code: ['', [Validators.required]],
    discount: [0, [Validators.required, Validators.maxLength(3)]],
    expirationDate: ['', [Validators.required]],
    description: ['', [Validators.required]],
    minAmount: [0, [Validators.required]],
    quantity: [0, [Validators.required]],
  });
  ngOnInit() {
    this.ActivatedRoute.paramMap.subscribe((paramMap) => {
      const id = String(paramMap.get('id'));
      this.coupon.getOneCoupon(id).subscribe(({ data }) => {
        this.newCoupon = data;
        this.myForm.patchValue({
          code: this.newCoupon.code,
          discount: this.newCoupon.discount,
          expirationDate: this.newCoupon.expirationDate,
          description: this.newCoupon.description,
          minAmount: this.newCoupon.minAmount,
          quantity: this.newCoupon.quantity,
        });
      });
    });
  }
  onSubmit() {
    const data = {
      code: this.myForm.value.code || '',
      discount: this.myForm.value.discount || 0,
      expirationDate: moment(this.myForm.value.expirationDate).format('MM-DD-YYYY') || '',
      description: this.myForm.value.description || '',
      minAmount: this.myForm.value.minAmount || 0,
      quantity: this.myForm.value.quantity || 0,
    };
    this.coupon
      .updateCoupon(data, String(this.newCoupon._id))
      .subscribe((data: { message: string; data: Coupon; isSuccess: boolean; status: boolean }) => {
        console.log(data);
        this._snackBar.open(`${data.message}`, 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.router.navigate(['admin/coupon']);
      });
  }
}
