import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReportService } from '@core/services/report/report.service';

@Component({
  selector: 'app-management-report',
  templateUrl: './management-report.component.html',
  styleUrls: ['./management-report.component.css'],
})
export class ManagementReportComponent implements OnInit {
  listBook: any[] = [];
  displayedColumns: string[] = ['_id', 'userId', 'bookId', 'reason', 'comment', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  isLoading = true;
  constructor(
    private report: ReportService,
    private _liveAnnouncer: LiveAnnouncer,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.report.getAllReport().subscribe((data) => {
      const { docs } = data.data;
      this.listBook = docs;
      this.dataSource = new MatTableDataSource<any>(this.listBook);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  deleteReview(id: string) {
    if (window.confirm('Are you sure you want to delete this report?')) {
      this.report.deleteReport(id).subscribe(
        (data) => {
          this._snackBar.open(`${data.message}`, 'OK', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 2000,
          });
          this.ngOnInit();
        },
        ({ error }) => {
          this._snackBar.open(`${error.message}`, 'OK', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 2000,
          });
        },
      );
    }
  }
}
