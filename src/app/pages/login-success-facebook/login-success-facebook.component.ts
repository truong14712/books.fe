import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-login-success-facebook',
  templateUrl: './login-success-facebook.component.html',
  styleUrls: ['./login-success-facebook.component.css'],
})
export class LoginSuccessFacebookComponent implements OnInit {
  user!: any;
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
  ) {
    this.ActivatedRoute.paramMap.subscribe((params) => {
      const id = String(params.get('id'));
      this.auth.loginSuccessFacebook({ id }).subscribe(({ data }: any) => {
        this.auth.setUser(data.user);
        this.user = data.user;
        this.auth.setToken(data.accessToken);
        this.router.navigate(['/']);
      });
    });
  }

  ngOnInit() {}
}
