import { AddBookComponent } from '@pages/admin/book/add-book/add-book.component';
import { AddCategoryComponent } from '@pages/admin/category/add-category/add-category.component';
import { AddCouponComponent } from '@pages/admin/coupon/add-coupon/add-coupon.component';
import { AddEventComponent } from '@pages/admin/event/add-event/add-event.component';
import { DashboardComponent } from '@pages/admin/dashboard/dashboard.component';
import { DetailOrderComponent } from '@pages/admin/order/detail-order/detail-order.component';
import { DetailReportComponent } from '@pages/admin/report/detail-report/detail-report.component';
import { ManagementBookComponent } from '@pages/admin/book/management-book/management-book.component';
import { ManagementCategoryComponent } from '@pages/admin/category/management-category/management-category.component';
import { ManagementCouponComponent } from '@pages/admin/coupon/management-coupon/management-coupon.component';
import { ManagementEventComponent } from '@pages/admin/event/management-event/management-event.component';
import { ManagementOrderComponent } from '@pages/admin/order/management-order/management-order.component';
import { ManagementReportComponent } from '@pages/admin/report/management-report/management-report.component';
import { ManagementUserComponent } from '@pages/admin/user/management-user/management-user.component';
import { Routes } from '@angular/router';
import { UpdateBookComponent } from '@pages/admin/book/update-book/update-book.component';
import { UpdateCategoryComponent } from '@pages/admin/category/update-category/update-category.component';
import { UpdateCouponComponent } from '@pages/admin/coupon/update-coupon/update-coupon.component';
import { UpdateEventComponent } from '@pages/admin/event/update-event/update-event.component';

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
    path: 'order/detail/:id',
    component: DetailOrderComponent,
  },
  {
    path: 'user',
    component: ManagementUserComponent,
  },
  {
    path: 'event',
    component: ManagementEventComponent,
  },
  {
    path: 'event/add',
    component: AddEventComponent,
  },
  {
    path: 'event/update/:id',
    component: UpdateEventComponent,
  },
  {
    path: 'report',
    component: ManagementReportComponent,
  },
  {
    path: 'report/detail/:id',
    component: DetailReportComponent,
  },
];
export default routes;
