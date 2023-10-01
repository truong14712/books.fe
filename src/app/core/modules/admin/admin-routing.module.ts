import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import routes from '@core/constants/adminRoutes';
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
  static routes = routes;
}
