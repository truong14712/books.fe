import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import routes from '@core/constants/userRoutes';

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
  static routes = routes;
}
