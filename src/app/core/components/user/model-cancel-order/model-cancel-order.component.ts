import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { reason } from '@core/constants/reason';
import { OrderService } from '@core/services/order/order.service';
@Component({
  selector: 'app-model-cancel-order',
  templateUrl: './model-cancel-order.component.html',
  styleUrls: ['./model-cancel-order.component.css'],
})
export class ModelCancelOrderComponent {
  listReason = reason;
  selected = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { id: string },
    private order: OrderService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ModelCancelOrderComponent>,
  ) {}

  onSubmit() {
    if (this.selected) {
      const data: any = {
        reason: this.selected || '',
      };
      this.order.cancelOrder(data, this.data.id).subscribe((data) => {
        this._snackBar.open(`${data.message}`, 'OK', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
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
