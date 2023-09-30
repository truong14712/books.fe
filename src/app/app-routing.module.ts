import { ActivationComponent } from '@pages/activation/activation.component';
import { AdminGuard } from '@core/guards/admin.guard';
import { AdminLayoutComponent } from '@core/layouts/adminLayout/adminLayout.component';
import { AdminRoutingModule } from '@core/modules/admin/admin-routing.module';
import { AuthRoutingModule } from './core/modules/auth/auth-routing.module';
import { BookDetailComponent } from '@pages/book-detail/book-detail.component';
import { CategoryDetailComponent } from '@pages/category-detail/category-detail.component';
import { HomeComponent } from '@pages/home/home.component';
import { LoginComponent } from '@pages/login/login.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from '@pages/pageNotFound/pageNotFound.component';
import { RegisterComponent } from '@pages/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from '@core/guards/user.guard';
import { UserLayoutComponent } from '@core/layouts/userLayout/userLayout.component';
import { CartComponent } from '@pages/user/cart/cart.component';
const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'book-detail/:slug/:id',
        component: BookDetailComponent,
      },
      {
        path: 'category-detail/:slug/:id',
        component: CategoryDetailComponent,
      },
      {
        path: 'activation/:activation_token',
        component: ActivationComponent,
      },
      {
        path: 'user/cart',
        component: CartComponent,
      },
    ],
  },
  {
    path: 'user',
    component: UserLayoutComponent,
    canActivate: [UserGuard],
    children: [...AuthRoutingModule.routes],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [...AdminRoutingModule.routes],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
