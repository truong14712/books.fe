import { AuthService } from '@core/services/auth/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '@core/interfaces/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user!: any;
  hideOne = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {}
  myForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
  });

  onSubmit() {
    if (this.myForm.valid) {
      this.user = this.myForm.value;
      this.auth.Login(this.user).subscribe(
        (data: {
          isSuccess: boolean;
          status: number;
          message: string;
          data: {
            accessToken: string;
            user: User;
            refreshToken: string;
          };
        }) => {
          this._snackBar.open(`${data.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          const { user, accessToken } = data.data;
          this.auth.setUser(user);
          this.auth.setToken(accessToken);
          this.router.navigate(['/']);
        },
        (err) => {
          this._snackBar.open(`${err.error.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        },
      );
    }
  }
}
