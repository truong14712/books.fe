import { AddBookComponent } from '@pages/admin/book/add-book/add-book.component';
import { AddCategoryComponent } from '@pages/admin/category/add-category/add-category.component';
import { AddCouponComponent } from '@pages/admin/coupon/add-coupon/add-coupon.component';
import { DashboardComponent } from '@pages/admin/dashboard/dashboard.component';
import { ManagementBookComponent } from '@pages/admin/book/management-book/management-book.component';
import { ManagementCategoryComponent } from '@pages/admin/category/management-category/management-category.component';
import { ManagementCouponComponent } from '@pages/admin/coupon/management-coupon/management-coupon.component';
import { Routes } from '@angular/router';
import { UpdateBookComponent } from '@pages/admin/book/update-book/update-book.component';
import { UpdateCategoryComponent } from '@pages/admin/category/update-category/update-category.component';
import { UpdateCouponComponent } from '@pages/admin/coupon/update-coupon/update-coupon.component';
import { ManagementOrderComponent } from '@pages/admin/order/management-order/management-order.component';
import { UpdateOrderComponent } from '@pages/admin/order/update-order/update-order.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'book',
    component: ManagementBookComponent,
  },
  {
    path: 'book/add',
    component: AddBookComponent,
  },
  {
    path: 'book/update/:id',
    component: UpdateBookComponent,
  },
  {
    path: 'category',
    component: ManagementCategoryComponent,
  },
  {
    path: 'category/add',
    component: AddCategoryComponent,
  },
  {
    path: 'category/update/:id',
    component: UpdateCategoryComponent,
  },
  {
    path: 'coupon',
    component: ManagementCouponComponent,
  },
  {
    path: 'coupon/add',
    component: AddCouponComponent,
  },
  {
    path: 'coupon/update/:id',
    component: UpdateCouponComponent,
  },
  {
    path: 'order',
    component: ManagementOrderComponent,
  },
  {
    path: 'order/update/:id',
    component: UpdateOrderComponent,
  },
];
export default routes;
