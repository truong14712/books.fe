import { ActivationComponent } from '@pages/activation/activation.component';
import { AdminGuard } from '@core/guards/admin.guard';
import { AdminLayoutComponent } from '@core/layouts/adminLayout/adminLayout.component';
import { AdminRoutingModule } from '@core/modules/admin/admin-routing.module';
import { AuthRoutingModule } from './core/modules/auth/auth-routing.module';
import { BookDetailComponent } from '@pages/book-detail/book-detail.component';
import { CartComponent } from '@pages/user/cart/cart.component';
import { CategoryDetailComponent } from '@pages/category-detail/category-detail.component';
import { HomeComponent } from '@pages/home/home.component';
import { ListCategoryComponent } from '@pages/list-category/list-category.component';
import { LoginComponent } from '@pages/login/login.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from '@pages/pageNotFound/pageNotFound.component';
import { RegisterComponent } from '@pages/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from '@core/guards/user.guard';
import { UserLayoutComponent } from '@core/layouts/userLayout/userLayout.component';
import { ResetPasswordComponent } from '@pages/reset-password/reset-password.component';
import { ForgotPasswordComponent } from '@pages/user/forgot-password/forgot-password.component';
import { LoginSuccessGoogleComponent } from '@pages/login-success-google/login-success-google.component';
import { LoginSuccessFacebookComponent } from '@pages/login-success-facebook/login-success-facebook.component';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: 'home', redirectTo: '', pathMatch: 'full' },
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
      {
        path: 'all/categories',
        component: ListCategoryComponent,
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

  { path: 'buyer/register', component: RegisterComponent },
  { path: 'buyer/reset', component: ResetPasswordComponent },
  { path: 'buyer/forgot-password/:id', component: ForgotPasswordComponent },
  { path: 'buyer/login', component: LoginComponent },
  { path: 'buyer/login-success-google/:id', component: LoginSuccessGoogleComponent },
  { path: 'buyer/login-success-facebook/:id', component: LoginSuccessFacebookComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
