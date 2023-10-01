import { AddBookComponent } from '@pages/admin/book/add-book/add-book.component';
import { AddCategoryComponent } from '@pages/admin/category/add-category/add-category.component';
import { DashboardComponent } from '@pages/admin/dashboard/dashboard.component';
import { ManagementBookComponent } from '@pages/admin/book/management-book/management-book.component';
import { ManagementCategoryComponent } from '@pages/admin/category/management-category/management-category.component';
import { Routes } from '@angular/router';
import { UpdateBookComponent } from '@pages/admin/book/update-book/update-book.component';
import { UpdateBookHightLightComponent } from '@pages/admin/book/update-book-hight-light/update-book-hight-light.component';
import { UpdateCategoryComponent } from '@pages/admin/category/update-category/update-category.component';
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
    path: 'book/update/IsHighlighted/:id',
    component: UpdateBookHightLightComponent,
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
];
export default routes;
