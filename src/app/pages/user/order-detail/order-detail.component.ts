import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelReviewOrderComponent } from '@core/components/user/model-review-order/model-review-order.component';
import { rattingType } from '@core/constants/rattingType';
import { Order } from '@core/interfaces/order';
import { AuthService } from '@core/services/auth/auth.service';
import { OrderService } from '@core/services/order/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
  orderDetail!: Order;
  isLoading = true;
  rattingType = rattingType;
  user!: any;
  constructor(
    private order: OrderService,
    private ActivatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private auth: AuthService,
  ) {
    this.ActivatedRoute.paramMap.subscribe((params) => {
      const id = String(params.get('id'));
      this.order.getOneOrder(id).subscribe(({ data }) => {
        this.orderDetail = data;
        console.log(this.orderDetail);
        this.isLoading = false;
      });
    });
    this.user = this.auth.isAuthenticated();
    console.log(this.user);
  }
  handleReviewOrder(id: any, orderId: string) {
    const dialogRef = this.dialog.open(ModelReviewOrderComponent, {
      data: { id, orderId },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.ngOnInit();
      }
    });
  }
  ngOnInit() {}
  getStarArray(ratings: number): number[] {
    return Array(ratings).fill({});
  }
  handleRepurchase(id: string) {
    this.order.restoreOrder(id).subscribe(() => {
      this.router.navigate(['user/cart']);
    });
  }
}
