import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '@core/interfaces/user';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css'],
})
export class ActivationComponent implements OnInit {
  error = '';
  success = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private _snackBar: MatSnackBar,
    private routerNavigate: Router,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const activation_token: string | null = params.get('activation_token');
      if (activation_token) {
        this.auth.activation(activation_token).subscribe(
          (data: { isSuccess: boolean; status: number; message: string; data: User }) => {
            this._snackBar.open(`${data.message}`, 'OK', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 2000,
            });
            this.success = data.message;
            this.routerNavigate.navigate(['buyer/login']);
          },
          (err) => {
            this._snackBar.open(`${err.error.message}`, 'OK', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 2000,
            });
            this.error = err.error.message;
          },
        );
      }
    });
  }
}
