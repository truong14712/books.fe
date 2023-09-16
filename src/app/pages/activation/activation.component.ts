import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { User } from '@core/interfaces/user';
import { AuthService } from '@core/services/auth.service';
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
            });
            this.success = data.message;
          },
          (err) => {
            this._snackBar.open(`${err.error.message}`, 'OK', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.error = err.error.message;
          },
        );
      }
    });
  }
}
