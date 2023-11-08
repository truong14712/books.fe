import { AddBookComponent } from '@pages/admin/book/add-book/add-book.component';
import { AddCategoryComponent } from '@pages/admin/category/add-category/add-category.component';
import { AddCouponComponent } from '@pages/admin/coupon/add-coupon/add-coupon.component';
import { AddEventComponent } from '@pages/admin/event/add-event/add-event.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '@pages/admin/dashboard/dashboard.component';
import { DetailOrderComponent } from '@pages/admin/order/detail-order/detail-order.component';
import { DetailReportComponent } from '@pages/admin/report/detail-report/detail-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagementBookComponent } from '@pages/admin/book/management-book/management-book.component';
import { ManagementCategoryComponent } from '@pages/admin/category/management-category/management-category.component';
import { ManagementCouponComponent } from '@pages/admin/coupon/management-coupon/management-coupon.component';
import { ManagementEventComponent } from '@pages/admin/event/management-event/management-event.component';
import { ManagementOrderComponent } from '@pages/admin/order/management-order/management-order.component';
import { ManagementReportComponent } from '@pages/admin/report/management-report/management-report.component';
import { ManagementUserComponent } from '@pages/admin/user/management-user/management-user.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgChartsModule } from 'ng2-charts';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared-module/shared-module.module';
import { UpdateBookComponent } from '@pages/admin/book/update-book/update-book.component';
import { UpdateCategoryComponent } from '@pages/admin/category/update-category/update-category.component';
import { UpdateCouponComponent } from '@pages/admin/coupon/update-coupon/update-coupon.component';
import { UpdateEventComponent } from '@pages/admin/event/update-event/update-event.component';
import { UpdateOrderComponent } from '@pages/admin/order/update-order/update-order.component';

@NgModule({
  declarations: [
    ManagementBookComponent,
    ManagementCategoryComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    AddBookComponent,
    UpdateBookComponent,
    AddCouponComponent,
    UpdateCouponComponent,
    ManagementCouponComponent,
    ManagementOrderComponent,
    UpdateOrderComponent,
    DetailOrderComponent,
    ManagementUserComponent,
    ManagementEventComponent,
    AddEventComponent,
    UpdateEventComponent,
    ManagementReportComponent,
    DetailReportComponent,
    DashboardComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AdminRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    SharedModule,
    RouterModule,
    MatDialogModule,
    MatNativeDateModule,
    MatIconModule,
    MatDatepickerModule,
    MatSortModule,
    NgChartsModule,
  ],
})
export class AdminModule {}
