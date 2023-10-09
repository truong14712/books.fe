import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Coupon } from '@core/interfaces/coupon';
import { CouponService } from '@core/services/coupon/coupon.service';
import * as moment from 'moment';
@Component({
  selector: 'app-management-coupon',
  templateUrl: './management-coupon.component.html',
  styleUrls: ['./management-coupon.component.css'],
})
export class ManagementCouponComponent implements OnInit {
  listCoupon: Coupon[] = [];
  displayedColumns: string[] = ['_id', 'code', 'discount', 'expirationDate', 'minAmount', 'actions'];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  dataSource!: MatTableDataSource<Coupon>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  constructor(
    private coupon: CouponService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.coupon.getAllCoupon().subscribe((data) => {
      const { docs } = data.data;
      this.listCoupon = docs;
      this.dataSource = new MatTableDataSource<Coupon>(this.listCoupon);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  formattedDate(date: Date) {
    return moment(date).format('DD/MM/YYYY');
  }
  onDelete(id: string) {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      this.coupon.deleteCoupon(id).subscribe((data) => {
        this._snackBar.open(`${data.message}`, 'OK', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.ngOnInit();
      });
    }
  }
}
