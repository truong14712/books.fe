import { Component, OnInit } from '@angular/core';
import { ReportService } from '@core/services/report/report.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail-report',
  templateUrl: './detail-report.component.html',
  styleUrls: ['./detail-report.component.css'],
})
export class DetailReportComponent implements OnInit {
  detailReport: any;
  isLoading = true;
  constructor(
    private report: ReportService,
    private ActivatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.ActivatedRoute.paramMap.subscribe((paramMap) => {
      const id = String(paramMap.get('id'));
      this.report.getOneReport(id).subscribe(({ data }) => {
        this.detailReport = data;
        this.isLoading = false;
      });
    });
  }
  deleteReview() {
    this.report.deleteReview(this.detailReport._id).subscribe(
      () => {
        this._snackBar.open(`success`, 'OK', {
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
