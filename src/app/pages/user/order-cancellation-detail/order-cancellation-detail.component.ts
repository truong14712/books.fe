import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '@core/interfaces/order';
import { OrderService } from '@core/services/order/order.service';
import * as moment from 'moment';

@Component({
  selector: 'app-order-cancellation-detail',
  templateUrl: './order-cancellation-detail.component.html',
  styleUrls: ['./order-cancellation-detail.component.css'],
})
export class OrderCancellationDetailComponent {
  orderDetail!: Order;
  isLoading = true;
  constructor(
    private order: OrderService,
    private ActivatedRoute: ActivatedRoute,
  ) {
    this.ActivatedRoute.paramMap.subscribe((params) => {
      const id = String(params.get('id'));
      this.order.getOneOrder(id).subscribe(({ data }) => {
        this.orderDetail = data;
        this.isLoading = false;
      });
    });
  }

  formattedDate(value: string) {
    return moment(value).format('HH:mm DD-MM-YYYY');
  }
}
