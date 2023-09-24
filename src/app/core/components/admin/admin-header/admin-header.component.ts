import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@core/services/auth/auth.service';
import { ModelProfileAdminComponent } from '../model-profile-admin/model-profile-admin.component';
import { Router } from '@angular/router';
import { BookService } from '@core/services/book/book.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
})
export class AdminHeaderComponent implements OnInit {
  user!: any;
  getUser: any = {};
  @ViewChild('myInput', { static: false }) valueInput!: ElementRef;
  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private book: BookService,
  ) {}

  ngOnInit() {
    this.getUser = this.auth.isAuthenticated();
    if (this.getUser) {
      this.user = JSON.parse(localStorage.getItem('user') || '');
    } else {
      this.user = null;
    }
  }
  openDialog() {
    this.dialog.open(ModelProfileAdminComponent);
  }
  getValue() {
    const value = this.valueInput.nativeElement.value;
    if (value) {
      this.book.searchBook(value).subscribe((data) => {
        console.log(data);
      });
    }
  }
}
