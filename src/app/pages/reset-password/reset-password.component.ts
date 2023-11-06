import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {}
  myForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit() {
    const body = {
      email: this.myForm.value.email || '',
    };
    if (this.myForm.valid) {
      this.auth.forgotPassword(body).subscribe(
        (data: any) => {
          this._snackBar.open(`${data.message}`, 'OK', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 2000,
          });
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
  backLogin() {
    this.router.navigate(['/buyer/login']);
  }
}
