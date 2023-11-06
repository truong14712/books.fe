import { formatDate } from '@core/utils/formatDate';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Coupon } from '@core/interfaces/coupon';
import { CouponService } from '@core/services/coupon/coupon.service';

@Component({
  selector: 'app-model-show-voucher-detail',
  templateUrl: './model-show-voucher-detail.component.html',
  styleUrls: ['./model-show-voucher-detail.component.css'],
})
export class ModelShowVoucherDetailComponent implements OnInit {
  couponDetail!: Coupon;
  loading = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { id: string },
    private coupon: CouponService,
  ) {}

  ngOnInit() {
    this.coupon.getOneCoupon(this.data.id).subscribe(({ data }) => {
      this.couponDetail = data;
      this.loading = false;
    });
  }
  formatDate(date: string) {
    return formatDate(date);
  }
}
