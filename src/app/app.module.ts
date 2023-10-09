import { ActivationComponent } from '@pages/activation/activation.component';
import { AdminFooterComponent } from '@core/components/admin/admin-footer/admin-footer.component';
import { AdminHeaderComponent } from '@core/components/admin/admin-header/admin-header.component';
import { AdminLayoutComponent } from '@core/layouts/adminLayout/adminLayout.component';
import { AdminModule } from '@core/modules/admin/admin.module';
import { AdminNavbarComponent } from '@core/components/admin/admin-navbar/admin-navbar.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from '@core/interceptor/auth.interceptor';
import { AuthModule } from '@core/modules/auth/auth.module';
import { BookDetailComponent } from '@pages/book-detail/book-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CartComponent } from '@pages/user/cart/cart.component';
import { CategoryDetailComponent } from '@pages/category-detail/category-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from '@pages/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ListCategoryComponent } from '@pages/list-category/list-category.component';
import { LoginComponent } from './pages/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModelAccountComponent } from '@core/components/user/model-account/model-account.component';
import { ModelProfileAdminComponent } from '@core/components/admin/model-profile-admin/model-profile-admin.component';
import { ModelProfileComponent } from '@core/components/user/model-profile/model-profile.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from '@pages/pageNotFound/pageNotFound.component';
import { RegisterComponent } from '@pages/register/register.component';
import { SharedModule } from '@core/modules/shared-module/shared-module.module';
import { TruncatePipe } from '@core/pipe/truncate.pipe';
import { UserFooterComponent } from '@core/components/user/user-footer/user-footer.component';
import { UserHeaderComponent } from '@core/components/user/user-header/user-header.component';
import { UserLayoutComponent } from '@core/layouts/userLayout/userLayout.component';
import { UserNavbarComponent } from '@core/components/user/user-navbar/user-navbar.component';
import { UserSidebarComponent } from '@core/components/user/user-sidebar/user-sidebar.component';
import { SpinnerComponent } from '@core/components/spinner/spinner.component';
import { ModelShowVoucherComponent } from '@core/components/user/model-show-voucher/model-show-voucher.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
    UserFooterComponent,
    UserHeaderComponent,
    UserNavbarComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminNavbarComponent,
    ModelProfileComponent,
    PageNotFoundComponent,
    HomeComponent,
    ActivationComponent,
    ModelProfileAdminComponent,
    BookDetailComponent,
    UserSidebarComponent,
    ListCategoryComponent,
    CategoryDetailComponent,
    ModelAccountComponent,
    TruncatePipe,
    CartComponent,
    SpinnerComponent,
    ModelShowVoucherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    AdminModule,
    MatDialogModule,
    MatListModule,
    AuthModule,
    MatPaginatorModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
