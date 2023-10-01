import { AddAddressComponent } from '@pages/user/add-address/add-address.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChangeInforMationComponent } from '@pages/user/change-infor-mation/change-infor-mation.component';
import { ChangePasswordComponent } from '@pages/user/change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MyAddressComponent } from '@pages/user/my-address/my-address.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared-module/shared-module.module';

@NgModule({
  declarations: [ChangeInforMationComponent, ChangePasswordComponent, AddAddressComponent, MyAddressComponent],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatListModule,
    SharedModule,
    RouterModule,
  ],
})
export class AuthModule {}
