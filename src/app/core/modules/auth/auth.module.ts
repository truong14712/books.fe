import { AddAddressComponent } from '@pages/user/add-address/add-address.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChangeInforMationComponent } from '@pages/user/change-infor-mation/change-infor-mation.component';
import { ChangePasswordComponent } from '@pages/user/change-password/change-password.component';
import { CheckOutComponent } from '@pages/user/check-out/check-out.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModelAddressComponent } from '@core/components/user/model-address/model-address.component';
import { ModelCancelOrderComponent } from '@core/components/user/model-cancel-order/model-cancel-order.component';
import { ModelReportComponent } from '@core/components/user/model-report/model-report.component';
import { ModelReviewOrderComponent } from '@core/components/user/model-review-order/model-review-order.component';
import { ModelShowVoucherComponent } from '@core/components/user/model-show-voucher/model-show-voucher.component';
import { ModelShowVoucherDetailComponent } from '@core/components/user/model-show-voucher-detail/model-show-voucher-detail.component';
import { MyAddressComponent } from '@pages/user/my-address/my-address.component';
import { NgModule } from '@angular/core';
import { OrderCancellationDetailComponent } from '@pages/user/order-cancellation-detail/order-cancellation-detail.component';
import { OrderDetailComponent } from '@pages/user/order-detail/order-detail.component';
import { PurchaseComponent } from '@pages/user/purchase/purchase.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared-module/shared-module.module';
import { UpdateAddressComponent } from '@pages/user/update-address/update-address.component';
import { UserSidebarProfileComponent } from '@core/components/user/user-sidebar-profile/user-sidebar-profile.component';
import { UserSpinnerComponent } from '@core/components/user/user-spinner/user-spinner.component';
@NgModule({
  declarations: [
    ChangeInforMationComponent,
    ChangePasswordComponent,
    AddAddressComponent,
    MyAddressComponent,
    CheckOutComponent,
    ModelAddressComponent,
    PurchaseComponent,
    ModelCancelOrderComponent,
    ModelShowVoucherComponent,
    ModelShowVoucherDetailComponent,
    ModelReviewOrderComponent,
    OrderCancellationDetailComponent,
    OrderDetailComponent,
    ModelReportComponent,
    UserSidebarProfileComponent,
    UpdateAddressComponent,
    UserSpinnerComponent,
  ],
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
    MatRadioModule,
  ],
})
export class AuthModule {}
