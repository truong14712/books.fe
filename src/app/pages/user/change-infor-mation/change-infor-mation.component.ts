import { AuthService } from '@core/services/auth/auth.service';
import { changeInformation } from '@core/interfaces/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-infor-mation',
  templateUrl: './change-infor-mation.component.html',
  styleUrls: ['./change-infor-mation.component.css'],
})
export class ChangeInforMationComponent implements OnInit {
  user!: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.user = this.auth.isAuthenticated();
    if (this.user) {
      this.myForm.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        phoneNumber: this.user.phoneNumber,
      });
    }
  }
  myForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.maxLength(30)]],
    lastName: ['', [Validators.required, Validators.maxLength(30)]],
    phoneNumber: [
      0,
      [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern(
          '^(0|\\+84)(\\s|\\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\\d)(\\s|\\.)?(\\d{3})(\\s|\\.)?(\\d{3})$',
        ),
      ],
    ],
  });
  onSubmit() {
    const newUser: changeInformation = {
      firstName: this.myForm.value.firstName || '',
      lastName: this.myForm.value.lastName || '',
      phoneNumber: this.myForm.value.phoneNumber || '',
    };
    if (this.myForm.valid) {
      this.auth.changeInformation(newUser).subscribe(
        (data: any) => {
          this.auth.setUser(data.data);
          this._snackBar.open(`${data.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000,
          });
        },
        (err) => {
          this._snackBar.open(`${err.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000,
          });
        },
      );
    }
  }
  onHandleImage(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement.files) return;

    const file = inputElement.files?.[0];
    const formData = new FormData();
    formData.append('image', file);

    this.auth.changeAvatar(formData).subscribe((data: any) => {
      this.auth.setUser(data.data);
      this.ngOnInit();
      this._snackBar.open(`${data.message}`, 'OK', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });
  }
}
