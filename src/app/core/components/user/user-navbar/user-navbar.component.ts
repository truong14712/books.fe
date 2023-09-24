import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@core/services/auth/auth.service';
import { ModelProfileComponent } from '../model-profile/model-profile.component';
import { Router } from '@angular/router';
import { BookService } from '@core/services/book/book.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css'],
})
export class UserNavbarComponent implements OnInit {
  user!: any;
  getUser: any = {};
  @ViewChild('myInput', { static: false }) valueInput!: ElementRef;
  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private book: BookService,
    { nativeElement }: ElementRef<HTMLImageElement>,
  ) {
    const supports = 'loading' in HTMLImageElement.prototype;
    if (supports) {
      nativeElement.setAttribute('loading', 'lazy');
    }
  }
  getValue() {
    const value = this.valueInput.nativeElement.value;
    if (value) {
      this.book.searchBook(value).subscribe((data) => {
        console.log(data);
      });
    }
  }
  ngOnInit() {
    this.getUser = this.auth.isAuthenticated();
    if (this.getUser) {
      this.user = JSON.parse(localStorage.getItem('user') || '');
    } else {
      this.user = null;
    }
  }
  openDialog() {
    this.dialog.open(ModelProfileComponent);
  }
  login() {
    this.router.navigate(['login']);
  }
  register() {
    this.router.navigate(['register']);
  }
}
