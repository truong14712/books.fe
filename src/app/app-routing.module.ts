import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivationComponent } from '@pages/activation/activation.component';
import { RegisterComponent } from '@pages/register/register.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  {
    path: 'activation/:activation_token',
    component: ActivationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
