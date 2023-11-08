import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { rattingType } from '@core/constants/rattingType';
import { Book } from '@core/interfaces/book';
import { User } from '@core/interfaces/user';
import { AuthService } from '@core/services/auth/auth.service';
import { BookService } from '@core/services/book/book.service';

@Component({
  selector: 'app-model-review-order',
  templateUrl: './model-review-order.component.html',
  styleUrls: ['./model-review-order.component.css'],
})
export class ModelReviewOrderComponent implements OnInit {
  bookDetail!: Book;
  isLoading = true;
  rattingType = rattingType;
  user!: User;
  messageValue = '';
  selectedRatingIndex = -1;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { id: string; orderId: string },
    private book: BookService,
    private auth: AuthService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ModelReviewOrderComponent>,
  ) {
    book.getOneBook(data.id).subscribe(({ data }) => {
      this.bookDetail = data;
      this.isLoading = false;
    });
    this.user = auth.isAuthenticated();
  }
  handleRating(value: number) {
    this.selectedRatingIndex = value;
  }
  ngOnInit() {}
  handleClickReview() {
    if (this.selectedRatingIndex >= 1) {
      const data = {
        rating: this.selectedRatingIndex,
        orderId: this.data.orderId,
        user: this.user,
        bookId: this.data.id,
        comment: this.messageValue,
      };
      this.book.createNewReview(data).subscribe(
        (res: any) => {
          this._snackBar.open(`${res.message}`, 'OK', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          if (res.data) {
            this.dialogRef.close(res.data);
          } else {
            this.dialogRef.close(undefined);
          }
        },
        ({ error }) => {
          this._snackBar.open(`${error.message}`, 'OK', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        },
      );
    }
  }
}
