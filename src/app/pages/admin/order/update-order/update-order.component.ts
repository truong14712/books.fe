import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '@core/services/order/order.service';
import { statusTypeAdmin } from '@core/constants/statusType';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css'],
})
export class UpdateOrderComponent implements OnInit {
  selected!: string;
  listStatus = statusTypeAdmin;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { id: string },
    private order: OrderService,
    private dialogRef: MatDialogRef<UpdateOrderComponent>,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.order.getOneOrder(this.data.id).subscribe(({ data }) => {
      this.selected = data.status;
    });
  }
  onSubmit() {
    if (this.selected !== 'Trả hàng/Hoàn tiền') {
      const body = {
        status: this.selected,
      };
      this.order.updateOrder(body, this.data.id).subscribe((data) => {
        this._snackBar.open(`${data.message}`, 'OK', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2000,
        });
        if (data.data) {
          this.dialogRef.close(data.data);
        } else {
          this.dialogRef.close(undefined);
        }
      });
    } else {
      const body = {
        status: this.selected,
      };
      this.order.refundOrderSuccess(body, this.data.id).subscribe((data) => {
        this._snackBar.open(`${data.message}`, 'OK', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2000,
        });
        if (data.data) {
          this.dialogRef.close(data.data);
        } else {
          this.dialogRef.close(undefined);
        }
      });
    }
  }
}
