import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReportService } from '@core/services/report/report.service';

@Component({
  selector: 'app-model-report',
  templateUrl: './model-report.component.html',
  styleUrls: ['./model-report.component.css'],
})
export class ModelReportComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { bookId: string; userId: string; comment: string },
    private report: ReportService,
    private _snackBar: MatSnackBar,
  ) {}

  selectedReason!: string;
  otherViolation = '';
  onSubmit() {
    if (this.selectedReason !== 'Vi phạm khác') {
      this.report
        .addReport({
          bookId: this.data.bookId,
          userId: this.data.userId,
          reason: this.selectedReason,
          comment: this.data.comment,
        })
        .subscribe((data) => {
          this._snackBar.open(`${data.message}`, 'OK', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 2000,
          });
        });
    } else {
      this.report
        .addReport({
          bookId: this.data.bookId,
          userId: this.data.userId,
          reason: this.otherViolation,
          comment: this.data.comment,
        })
        .subscribe((data) => {
          this._snackBar.open(`${data.message}`, 'OK', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 2000,
          });
        });
    }
  }
}
