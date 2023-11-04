import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModelCancelOrderComponent } from '@core/components/user/model-cancel-order/model-cancel-order.component';
import { User } from '@core/interfaces/user';
import { AuthService } from '@core/services/auth/auth.service';
import { OrderService } from '@core/services/order/order.service';
import { statusTypeUser } from '@core/constants/statusType';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
})
export class PurchaseComponent implements OnInit {
  user!: User;
  listOrder: any;
  searchValue!: string;
  statusType = statusTypeUser;
  isLoading = true;
  totalPage!: number;

  constructor(
    private order: OrderService,
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {}
  yes = true;
  currentPage = 1;
  itemsPerPage = 5;
  allSelected = true;

  ngOnInit() {
    this.user = this.auth.isAuthenticated();
    if (this.user) {
      const id = String(this.user._id);
      this.order.getAllOrderUser(id).subscribe(({ data }) => {
        this.listOrder = data;
        this.yes = true;
        this.isLoading = false;
        this.totalPage = Math.ceil(this.listOrder.length / this.itemsPerPage);
      });
    }
  }
  handlePageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  handleRepurchase(id: string) {
    this.order.restoreOrder(id).subscribe(() => {
      this.router.navigate(['user/cart']);
    });
  }
  onSearch() {
    const query = this.searchValue;

    if (query) {
      this.router.navigate(['/user/purchase'], {
        queryParams: { _q: query },
      });
      this.order.searchOrderUser(query).subscribe(({ data }) => {
        this.listOrder = data.docs;
        this.totalPage = Math.ceil(this.listOrder.length / this.itemsPerPage);
      });
    } else {
      this.router.navigate(['/user/purchase']);
      this.ngOnInit();
    }
  }
  handleCancelOrder(id: string) {
    const dialogRef = this.dialog.open(ModelCancelOrderComponent, {
      data: { id },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.ngOnInit();
      }
    });
  }
  handleClick(valueStatus: string) {
    for (const item of this.statusType) {
      item.selected = item.value === valueStatus;
      this.allSelected = false;
    }
    if (valueStatus === 'Tất cả') {
      this.router.navigate(['/user/purchase']);
      this.order.searchOrderUser('').subscribe(({ data }) => {
        this.listOrder = data.docs;
        this.yes = true;
        if (this.listOrder?.length > 0) {
          this.totalPage = Math.ceil(this.listOrder.length / this.itemsPerPage);
        }
        if (data.docs === undefined) {
          this.yes = false;
        }
      });
    } else {
      this.router.navigate(['/user/purchase'], {
        queryParams: { _q: valueStatus },
      });
      this.order.searchOrderUser(valueStatus).subscribe(({ data }) => {
        this.listOrder = data.docs;
        this.yes = true;
        if (this.listOrder?.length > 0) {
          this.totalPage = Math.ceil(this.listOrder.length / this.itemsPerPage);
        }
        if (data.docs === undefined) {
          this.yes = false;
        }
      });
    }
  }
  handleRouterOrderDetail(id: string) {
    this.router.navigate([`user/purchase/order/${id}`]);
  }
  handleRefundOrder(id: string) {
    const data = {
      status: 'Đang xử lý tiền hoàn lại',
    };
    this.order.refundOrder(data, id).subscribe((data) => {
      this._snackBar.open(`${data.message}`, 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2000,
      });
    });
  }
}
