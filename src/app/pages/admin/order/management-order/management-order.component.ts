import { Component, OnInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from '@core/interfaces/order';
import { OrderService } from '@core/services/order/order.service';
import { UpdateOrderComponent } from '../update-order/update-order.component';

@Component({
  selector: 'app-management-order',
  templateUrl: './management-order.component.html',
  styleUrls: ['./management-order.component.css'],
})
export class ManagementOrderComponent implements OnInit {
  listCoupon: Order[] = [];
  displayedColumns: string[] = ['_id', 'orderId', 'userId', 'totalPrice', 'status', 'shippingAddress', 'actions'];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  dataSource!: MatTableDataSource<Order>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  constructor(
    private _snackBar: MatSnackBar,
    private order: OrderService,
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
  ) {}

  ngOnInit() {
    this.order.getAllOrder().subscribe((data) => {
      const { docs } = data.data;
      this.listCoupon = docs;
      this.dataSource = new MatTableDataSource<Order>(this.listCoupon);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openModelUpdateOrderComponent(id: string) {
    const dialogRef = this.dialog.open(UpdateOrderComponent, {
      data: { id },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log(data);
        this.ngOnInit();
      }
    });
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
