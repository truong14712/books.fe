import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StatisticalService } from '@core/services/statistical/statistical.service';
import { ChartOptions, ChartConfiguration } from 'chart.js';
import { Router } from '@angular/router';
import { validateToDate } from '../../../core/validation/validateToDate';
import * as moment from 'moment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public totalOrder: any;
  public countRatting!: any;
  public statusOrder!: [string];
  public ratting!: [number];
  public calculateRevenueByAuthor!: any;

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
  };
  public lineChartLegend = true;
  public lineChartData!: ChartConfiguration<'line'>['data'];

  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
  public barChartData!: ChartConfiguration<'bar'>['data'];
  isLoading = true;
  myForm = this.FormBuilder.group({
    fromDate: [null, [Validators.required]],
    toDate: [null, [Validators.required, validateToDate]],
  });
  constructor(
    private statistical: StatisticalService,
    private FormBuilder: FormBuilder,
    private router: Router,
  ) {
    statistical.totalOrder().subscribe(({ data }) => {
      this.totalOrder = [
        {
          data: data.map((item: any) => Number(item.count)),
        },
      ];
      this.statusOrder = data.map((item: any) => {
        return item._id;
      });
      this.isLoading = false;
    });
    statistical.countRatingInOrders().subscribe(({ data }) => {
      this.countRatting = [
        {
          data: data.map((item: any) => Number(item.count)),
        },
      ];
      this.ratting = data.map((item: any) => {
        return item._id + ' Sao ';
      });
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.statistical.calculateRevenueByAuthor().subscribe(({ data }) => {
      this.calculateRevenueByAuthor = data;
      this.createBarChartData();
      this.createLineChartData();
      this.isLoading = false;
    });
  }
  calculateTotalRevenue!: [];

  createBarChartData() {
    if (this.calculateRevenueByAuthor) {
      this.barChartData = {
        labels: this.calculateRevenueByAuthor.map((item: any) => item._id),
        datasets: [
          {
            data: this.calculateRevenueByAuthor.map((item: any) => item.totalRevenue),
            label: 'Doanh thu',
          },
          {
            data: this.calculateRevenueByAuthor.map((item: any) => item.totalSoldBooks),
            label: 'Số lượng sách đã bán',
          },
        ],
      };
    }
  }
  createLineChartData() {
    if (this.calculateTotalRevenue) {
      this.lineChartData = {
        labels: this.calculateTotalRevenue.map((item: any) => item._id),
        datasets: [
          {
            data: this.calculateTotalRevenue.map((item: any) => item.totalSoldBooks),
            label: 'Số lượng sách đã bán theo ngày',
            fill: true,
            tension: 0.5,
            borderColor: 'blue',
            backgroundColor: 'rgba(255,0,0,0.3)',
          },
          {
            data: this.calculateTotalRevenue.map((item: any) => item.totalRevenue),
            label: 'Tổng doanh thu đã bán theo ngày',
            fill: true,
            tension: 0.5,
            borderColor: 'aqua',
            backgroundColor: 'rgba(255, 206, 86, 0.6)',
          },
        ],
      };
    }
  }
  onSubmit() {
    if (this.myForm.valid) {
      this.router.navigate(['/admin/dashboard'], {
        queryParams: {
          fromDate: moment(this.myForm.value.fromDate).format('MM-DD-YYYY'),
          toDate: moment(this.myForm.value.toDate).format('MM-DD-YYYY'),
        },
      });
      this.statistical
        .calculateTotalRevenue(`${this.myForm.value.fromDate}-${this.myForm.value.toDate}`)
        .subscribe(({ data }) => {
          this.calculateTotalRevenue = data;
          this.createLineChartData();
        });
    }
  }
}
