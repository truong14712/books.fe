import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-login-success-facebook',
  templateUrl: './login-success-facebook.component.html',
  styleUrls: ['./login-success-facebook.component.css'],
})
export class LoginSuccessFacebookComponent {
  user!: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {
    this.ActivatedRoute.paramMap.subscribe((params) => {
      const id = String(params.get('id'));
      this.auth.loginSuccessFacebook({ id }).subscribe(
        ({ data }: any) => {
          this.auth.setUser(data.user);
          this.user = data.user;
          this.auth.setToken(data.accessToken);
          this._snackBar.open(`Thành công`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000,
          });
          if (this.user.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/']);
          }
        },
        (err) => {
          this._snackBar.open(`${err.error.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000,
          });
        },
      );
    });
  }
}
