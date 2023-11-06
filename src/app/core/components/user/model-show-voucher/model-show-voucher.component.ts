import { Component, OnInit } from '@angular/core';
import { CouponService } from '@core/services/coupon/coupon.service';
import { Coupon } from '@core/interfaces/coupon';
import { formatDate } from '@core/utils/formatDate';
@Component({
  selector: 'app-model-show-voucher',
  templateUrl: './model-show-voucher.component.html',
  styleUrls: ['./model-show-voucher.component.css'],
})
export class ModelShowVoucherComponent implements OnInit {
  constructor(private coupon: CouponService) {}
  getAllCoupon!: Coupon[];
  loading = true;
  ngOnInit() {
    this.loading = true;
    this.coupon.getAllCoupon().subscribe(({ data }) => {
      this.getAllCoupon = data.docs;
      this.loading = false;
    });
  }
  formatDate(date: string) {
    return formatDate(date);
  }
}
