import { AddBookComponent } from '@pages/admin/book/add-book/add-book.component';
import { AddCategoryComponent } from '@pages/admin/category/add-category/add-category.component';
import { AddCouponComponent } from '@pages/admin/coupon/add-coupon/add-coupon.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagementBookComponent } from '@pages/admin/book/management-book/management-book.component';
import { ManagementCategoryComponent } from '@pages/admin/category/management-category/management-category.component';
import { ManagementCouponComponent } from '@pages/admin/coupon/management-coupon/management-coupon.component';
import { ManagementOrderComponent } from '@pages/admin/order/management-order/management-order.component';
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
import { MatTableModule } from '@angular/material/table';
import { ModelUpdateBookHightLightComponent } from '@core/components/admin/model-update-book-hight-light/model-update-book-hight-light.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared-module/shared-module.module';
import { UpdateBookComponent } from '@pages/admin/book/update-book/update-book.component';
import { UpdateCategoryComponent } from '@pages/admin/category/update-category/update-category.component';
import { UpdateCouponComponent } from '@pages/admin/coupon/update-coupon/update-coupon.component';
import { UpdateOrderComponent } from '@pages/admin/order/update-order/update-order.component';

@NgModule({
  declarations: [
    ManagementBookComponent,
    ManagementCategoryComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    AddBookComponent,
    UpdateBookComponent,
    ModelUpdateBookHightLightComponent,
    AddCouponComponent,
    UpdateCouponComponent,
    ManagementCouponComponent,
    ManagementOrderComponent,
    UpdateOrderComponent,
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
  ],
})
export class AdminModule {}
