import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@core/interfaces/user';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-model-profile',
  templateUrl: './model-profile.component.html',
  styleUrls: ['./model-profile.component.css'],
})
export class ModelProfileComponent {
  user!: User;
  constructor(
    private auth: AuthService,
    private Router: Router,
  ) {
    this.user = auth.isAuthenticated();
  }

  logout() {
    localStorage.clear();
    this.auth.logout();
    this.Router.navigate(['buyer/login']);
  }
}
