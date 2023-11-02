import { Book } from '@core/interfaces/book';
import { BookService } from '@core/services/book/book.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
    private book: BookService,
    private _liveAnnouncer: LiveAnnouncer,
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
            duration: 2000,
          });
          this.ngOnInit();
        },
        ({ error }) => {
          this._snackBar.open(`${error.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000,
          });
        },
      );
    }
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
