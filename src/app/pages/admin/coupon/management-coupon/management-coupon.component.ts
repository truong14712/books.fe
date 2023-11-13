import * as moment from 'moment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Coupon } from '@core/interfaces/coupon';
import { CouponService } from '@core/services/coupon/coupon.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  isLoading = true;
  constructor(
    private coupon: CouponService,
    private _snackBar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer,
  ) {}

  ngOnInit() {
    this.coupon.getAllCoupon().subscribe((data) => {
      const { docs } = data.data;
      this.listCoupon = docs;
      this.dataSource = new MatTableDataSource<Coupon>(this.listCoupon);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }

  formattedDate(date: Date) {
    return moment(date).format('DD/MM/YYYY');
  }
  onDelete(id: string) {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      this.coupon.deleteCoupon(id).subscribe(
        (data) => {
          this._snackBar.open(`${data.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
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
    }
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
