import { AuthService } from '@core/services/auth/auth.service';
import { checkPassword } from '@core/validation/checkPassword';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { noWhitespaceValidator } from '@core/validation/noWhitespaceValidator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  hide = true;
  hideOne = true;
  hideTwo = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private _snackBar: MatSnackBar,
    private route: Router,
  ) {}
  myForm = this.formBuilder.group(
    {
      password: ['', [Validators.required, Validators.minLength(6), noWhitespaceValidator]],
      newPassword: ['', [Validators.required, Validators.minLength(6), noWhitespaceValidator]],
      confirmPassword: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(30), noWhitespaceValidator],
      ],
    },
    {
      validator: checkPassword,
    },
  );

  onSubmit() {
    if (this.myForm.valid) {
      const changePassword = {
        password: this.myForm.value.password,
        newPassword: this.myForm.value.newPassword,
        confirmPassword: this.myForm.value.confirmPassword,
      };

      this.auth.changePassword(changePassword).subscribe(
        (data: any) => {
          this._snackBar.open(`${data.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.route.navigate(['/']);
        },
        (error) => {
          this._snackBar.open(`${error.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        },
      );
    }
  }
}
