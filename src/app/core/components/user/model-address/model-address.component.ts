import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '@core/interfaces/user';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-model-address',
  templateUrl: './model-address.component.html',
  styleUrls: ['./model-address.component.css'],
})
export class ModelAddressComponent implements OnInit {
  user!: User;
  constructor(
    private auth: AuthService,
    private dialogRef: MatDialogRef<ModelAddressComponent>,
  ) {}

  ngOnInit() {
    this.user = this.auth.isAuthenticated();
  }
  selectAddress(user: any) {
    const data = {
      addressId: user._id as string,
      status: true,
    };
    this.auth.changeAddressStatus(data).subscribe((res: any) => {
      this.auth.setUser(res.data);
      if (res.data) {
        this.dialogRef.close(res.data);
      } else {
        this.dialogRef.close(undefined);
      }
    });
  }
}
