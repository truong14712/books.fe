import { AuthService } from '@core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { User } from '@core/interfaces/user';
import { checkPassword } from '@core/validation/checkPassword';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  avatar!: File;
  user!: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  hide = true;
  hideOne = true;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private _snackBar: MatSnackBar,
  ) {}
  myForm = this.formBuilder.group(
    {
      firstName: ['', [Validators.required, Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    },
    {
      validator: checkPassword,
    },
  );

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement.files) return;
    const fileNew: any = inputElement.files?.[0];
    if (fileNew) {
      this.avatar = fileNew;
    }
  }
  onSubmit() {
    const formValue: User = this.myForm?.value as User;
    const formData = new FormData();

    formData.append('firstName', formValue.firstName);
    formData.append('lastName', formValue.lastName);
    formData.append('email', formValue.email);
    formData.append('password', formValue.password);
    formData.append('confirmPassword', formValue.confirmPassword);
    formData.append('phoneNumber', formValue.phoneNumber.toString());
    formData.append('image', this.avatar);

    this.user = formData;
    if (this.myForm.valid) {
      this.auth.Register(this.user).subscribe(
        (data: { message: string; success: boolean }) => {
          this._snackBar.open(`${data.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000,
          });
        },

        ({ error }) => {
          this._snackBar.open(`${error.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000,
          });
        },
      );
    }
  }
}
