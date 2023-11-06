import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@core/interfaces/user';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-management-user',
  templateUrl: './management-user.component.html',
  styleUrls: ['./management-user.component.css'],
})
export class ManagementUserComponent implements OnInit {
  listUser: User[] = [];
  displayedColumns: string[] = ['_id', 'lastName', 'email', 'phoneNumber', 'role', 'actions'];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  dataSource!: MatTableDataSource<User>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  constructor(
    private auth: AuthService,
    private _snackBar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer,
  ) {}

  ngOnInit() {
    this.auth.getAllUser().subscribe((data: any) => {
      const { docs } = data.data;
      this.listUser = docs;
      this.dataSource = new MatTableDataSource<User>(this.listUser);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  handleDeleteUser(id: string) {
    if (window.confirm('Are you sure you want to delete this user?')) {
      this.auth.deleteUser(id).subscribe(
        (data: any) => {
          this._snackBar.open(`${data.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.ngOnInit();
        },
        ({ error }) => {
          this._snackBar.open(`${error.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000,
          });
        },
      );
    }
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
