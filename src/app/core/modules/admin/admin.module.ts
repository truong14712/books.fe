import { AddBookComponent } from '@pages/admin/book/add-book/add-book.component';
import { AddCategoryComponent } from '@pages/admin/category/add-category/add-category.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagementBookComponent } from '@pages/admin/book/management-book/management-book.component';
import { ManagementCategoryComponent } from '@pages/admin/category/management-category/management-category.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared-module/shared-module.module';
import { UpdateBookComponent } from '@pages/admin/book/update-book/update-book.component';
import { UpdateBookHightLightComponent } from '@pages/admin/book/update-book-hight-light/update-book-hight-light.component';
import { UpdateCategoryComponent } from '@pages/admin/category/update-category/update-category.component';
import { ModelUpdateBookHightLightComponent } from '@core/components/admin/model-update-book-hight-light/model-update-book-hight-light.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ManagementBookComponent,
    ManagementCategoryComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    AddBookComponent,
    UpdateBookComponent,
    UpdateBookHightLightComponent,
    ModelUpdateBookHightLightComponent,
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
  ],
})
export class AdminModule {}
