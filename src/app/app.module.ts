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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from '@pages/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModelProfileComponent } from '@core/components/user/model-profile/model-profile.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from '@pages/pageNotFound/pageNotFound.component';
import { RegisterComponent } from '@pages/register/register.component';
import { UserFooterComponent } from '@core/components/user/user-footer/user-footer.component';
import { UserHeaderComponent } from '@core/components/user/user-header/user-header.component';
import { UserLayoutComponent } from '@core/layouts/userLayout/userLayout.component';
import { UserNavbarComponent } from '@core/components/user/user-navbar/user-navbar.component';

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
