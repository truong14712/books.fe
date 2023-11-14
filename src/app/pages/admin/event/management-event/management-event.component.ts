import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from '@core/services/event/event.service';
import * as moment from 'moment';

@Component({
  selector: 'app-management-event',
  templateUrl: './management-event.component.html',
  styleUrls: ['./management-event.component.css'],
})
export class ManagementEventComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    private book: EventService,
    private _liveAnnouncer: LiveAnnouncer,
  ) {}
  listBook: any[] = [];
  displayedColumns: string[] = [
    '_id',
    'nameBook',
    'auth',
    'price',
    'discountPrice',
    'start_Date',
    'finish_Date',
    'actions',
  ];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  ngOnInit() {
    this.book.getAllEvent().subscribe((data) => {
      const { docs } = data.data;
      this.listBook = docs;
      this.dataSource = new MatTableDataSource<any>(this.listBook);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  deleteBook(id: string) {
    if (window.confirm('Are you sure you want to delete this book?')) {
      this.book.deleteEvent(id).subscribe(
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
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  formatDate(date: string) {
    return moment(date).format('DD/MM/YYYY HH:mm');
  }
}
