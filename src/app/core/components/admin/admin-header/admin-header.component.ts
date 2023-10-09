import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@core/services/auth/auth.service';
import { ModelProfileAdminComponent } from '../model-profile-admin/model-profile-admin.component';
import { BookService } from '@core/services/book/book.service';
import { Book } from '@core/interfaces/book';
import { User } from '@core/interfaces/user';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
})
export class AdminHeaderComponent implements OnInit {
  getUser!: User;
  @ViewChild('myInput', { static: false }) valueInput!: ElementRef;
  dataSearch: Book[] = [];
  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private book: BookService,
  ) {}

  ngOnInit() {
    this.getUser = this.auth.isAuthenticated();
  }
  openDialog() {
    this.dialog.open(ModelProfileAdminComponent);
  }
  getValue() {
    const inputElement = this.valueInput.nativeElement;
    const value = inputElement.value.trim();
    if (value) {
      this.book.searchBook(value).subscribe(({ data }) => {
        this.dataSearch = data;
      });
    } else {
      this.dataSearch = [];
    }
  }
  handleItemClick() {
    this.dataSearch = [];
  }
}
