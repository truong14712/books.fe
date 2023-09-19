import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Category } from '@core/interfaces/category';
import { CategoryService } from '@core/services/category/category.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-management-category',
  templateUrl: './management-category.component.html',
  styleUrls: ['./management-category.component.css'],
})
export class ManagementCategoryComponent implements OnInit {
  listCategory: Category[] = [];
  displayedColumns: string[] = ['_id', 'nameCategory', 'actions'];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  dataSource!: MatTableDataSource<Category>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  constructor(
    private category: CategoryService,
    private _snackBar: MatSnackBar,
    private route: Router,
  ) {}
  ngOnInit() {
    this.category.getAllCategory().subscribe(
      (data) => {
        const { docs } = data.data;
        this.listCategory = docs;
        this.dataSource = new MatTableDataSource<Category>(this.listCategory);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error(error);
      },
    );
  }

  deleteCategory(id: string) {
    if (window.confirm('Are you sure you want to delete this category?')) {
      this.category.deleteCategory(id).subscribe(
        (data) => {
          this._snackBar.open(`${data.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.ngOnInit();
        },
        (error) => {
          console.error(error);
        },
      );
    }
  }
  updateCategory(id: string) {
    this.route.navigate(['admin/category/update/' + id]);
  }
}
