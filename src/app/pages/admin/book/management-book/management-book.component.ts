import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Book } from '@core/interfaces/book';
import { BookService } from '@core/services/book/book.service';

@Component({
  selector: 'app-management-book',
  templateUrl: './management-book.component.html',
  styleUrls: ['./management-book.component.css'],
})
export class ManagementBookComponent implements OnInit {
  listBook: Book[] = [];
  displayedColumns: string[] = ['_id', 'nameBook', 'auth', 'price', 'discountPrice', 'actions'];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  dataSource!: MatTableDataSource<Book>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  constructor(
    private _snackBar: MatSnackBar,
    private route: Router,
    private book: BookService,
  ) {}

  ngOnInit() {
    this.book.getAllBook().subscribe((data) => {
      const { docs } = data.data;
      this.listBook = docs;
      this.dataSource = new MatTableDataSource<Book>(this.listBook);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteBook(id: string) {
    if (window.confirm('Are you sure you want to delete this book?')) {
      this.book.deleteBook(id).subscribe(
        (data) => {
          this._snackBar.open(`${data.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.ngOnInit();
        },
      );
    }
  }
  updateBook(id: string) {
    this.route.navigate(['admin/book/update/' + id]);
  }
}