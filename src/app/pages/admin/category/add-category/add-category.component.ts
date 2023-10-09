import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Category } from '@core/interfaces/category';
import { CategoryService } from '@core/services/category/category.service';
import { noWhitespaceValidator } from '@core/validation/noWhitespaceValidator';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private FormBuilder: FormBuilder,
    private category: CategoryService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {}
  myForm = this.FormBuilder.group({
    nameCategory: ['', [Validators.required, Validators.minLength(6), noWhitespaceValidator]],
    description: ['', [Validators.required]],
  });
  onSubmit() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const category: any = {
      nameCategory: this.myForm.value.nameCategory || '',
      description: this.myForm.value.description || '',
    };
    if (this.myForm.valid) {
      this.category.addCategory(category).subscribe(
        (data: { message: string; data: Category; isSuccess: boolean; status: boolean }) => {
          console.log(data);
          this._snackBar.open(`${data.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.router.navigate(['admin/category']);
        },
        ({ error }) => {
          console.log(error);
          this._snackBar.open(`${error.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        },
      );
    }
  }
}
