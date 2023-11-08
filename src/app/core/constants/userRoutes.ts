import { AddAddressComponent } from '@pages/user/add-address/add-address.component';
import { ChangeInforMationComponent } from '@pages/user/change-infor-mation/change-infor-mation.component';
import { ChangePasswordComponent } from '@pages/user/change-password/change-password.component';
import { CheckOutComponent } from '@pages/user/check-out/check-out.component';
import { MyAddressComponent } from '@pages/user/my-address/my-address.component';
import { OrderCancellationDetailComponent } from '@pages/user/order-cancellation-detail/order-cancellation-detail.component';
import { OrderDetailComponent } from '@pages/user/order-detail/order-detail.component';
import { PurchaseComponent } from '@pages/user/purchase/purchase.component';
import { Routes } from '@angular/router';
import { UpdateAddressComponent } from '@pages/user/update-address/update-address.component';

const routes: Routes = [
  { path: '', redirectTo: 'profile/changeInformation', pathMatch: 'full' },
  {
    path: 'profile/changeInformation',
    component: ChangeInforMationComponent,
  },
  {
    path: 'profile/changePassword',
    component: ChangePasswordComponent,
  },
  {
    path: 'profile/addAddress',
    component: AddAddressComponent,
  },
  {
    path: 'profile/updateAddress/:id',
    component: UpdateAddressComponent,
  },
  {
    path: 'profile/myAddress',
    component: MyAddressComponent,
  },
  {
    path: 'checkout',
    component: CheckOutComponent,
  },
  {
    path: 'purchase',
    component: PurchaseComponent,
  },
  {
    path: 'purchase/cancellation/:id',
    component: OrderCancellationDetailComponent,
  },
  {
    path: 'purchase/order/:id',
    component: OrderDetailComponent,
  },
];
export default routes;
