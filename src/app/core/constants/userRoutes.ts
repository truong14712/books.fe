import { AddAddressComponent } from '@pages/user/add-address/add-address.component';
import { ChangeInforMationComponent } from '@pages/user/change-infor-mation/change-infor-mation.component';
import { ChangePasswordComponent } from '@pages/user/change-password/change-password.component';
import { MyAddressComponent } from '@pages/user/my-address/my-address.component';
import { Routes } from '@angular/router';
import { CheckOutComponent } from '@pages/user/check-out/check-out.component';
import { PurchaseComponent } from '@pages/user/purchase/purchase.component';

const routes: Routes = [
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
];
export default routes;
