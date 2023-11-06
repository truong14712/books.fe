import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  id!: string;
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private route: Router,
  ) {
    this.ActivatedRoute.paramMap.subscribe((params) => {
      const id = String(params.get('id'));
      this.id = id;
    });
  }
  myForm = this.formBuilder.group({
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
  });
  ngOnInit() {}
  onSubmit() {
    const data = {
      newPassword: this.myForm.value.newPassword || '',
    };
    if (this.myForm.valid) {
      this.auth.resetPassword(this.id, data).subscribe(
        (data: any) => {
          this._snackBar.open(`${data.message}`, 'OK', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 2000,
          });
          this.route.navigate(['/buyer/login']);
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
}
