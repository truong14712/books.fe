import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '@core/interfaces/book';
import { OrderService } from '@core/services/order/order.service';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css'],
})
export class DetailOrderComponent implements OnInit {
  listCart: any[] = [];
  totalPrice = 0;
  constructor(
    private order: OrderService,
    private router: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.router.paramMap.subscribe((params) => {
      const id = String(params.get('id'));
      this.order.getOneOrder(id).subscribe(({ data }) => {
        this.listCart = data.cart;
        this.totalPrice = data.totalPrice;
      });
    });
  }
}
