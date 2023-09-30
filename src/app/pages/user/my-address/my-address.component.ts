import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-my-address',
  templateUrl: './my-address.component.html',
  styleUrls: ['./my-address.component.css'],
})
export class MyAddressComponent implements OnInit {
  user!: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private auth: AuthService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.user = this.auth.isAuthenticated();
  }
  removeAddress(id: string) {
    if (window.confirm('Are you sure you want to remove this address)')) {
      this.auth.deleteAddress(id).subscribe(
        (data: any) => {
          this.auth.setUser(data.data);
          this._snackBar.open(`${data.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.ngOnInit();
        },
        (err) => {
          this._snackBar.open(`${err.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        },
      );
    }
  }
}
