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
  removeAddress(id: string, status: boolean) {
    if (status === true) {
      this._snackBar.open('Bạn không thể Xóa địa chỉ mặc định', 'OK', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 2000,
      });
      return;
    }
    if (window.confirm('Are you sure you want to remove this address)')) {
      this.auth.deleteAddress(id).subscribe(
        (data: any) => {
          this.auth.setUser(data.data);
          this._snackBar.open(`${data.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000,
          });
          this.ngOnInit();
        },
        (error) => {
          this._snackBar.open(`${error.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000,
          });
        },
      );
    }
  }
  handleStatusAddress(user: any) {
    const data = {
      addressId: user._id as string,
      status: true,
    };
    this.auth.changeAddressStatus(data).subscribe((res: any) => {
      this._snackBar.open('Cập nhật địa chỉ mặc định thành công', 'OK', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 2000,
      });
      this.auth.setUser(res.data);
      this.ngOnInit();
    });
  }
}
