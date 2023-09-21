import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '@core/interfaces/category';
import { CategoryService } from '@core/services/category/category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css'],
})
export class UpdateCategoryComponent {
  newCategory!: Category;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private FormBuilder: FormBuilder,
    private ActivatedRoute: ActivatedRoute,
    private category: CategoryService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.ActivatedRoute.paramMap.subscribe((params) => {
      const id = String(params.get('id'));
      this.category.getOneCategory(id).subscribe(
        ({ data }) => {
          console.log(data);
          this.newCategory = data;
          this.myForm.patchValue({
            nameCategory: this.newCategory.nameCategory,
            description: this.newCategory.description,
          });
        },
        (error) => console.log(error.message),
      );
    });
  }
  myForm = this.FormBuilder.group({
    nameCategory: ['', [Validators.required, Validators.minLength(6)]],
    description: ['', [Validators.required]],
  });
  onSubmit() {
    const category: Category = {
      nameCategory: this.myForm.value.nameCategory || '',
      description: this.myForm.value.description || '',
    };
    if (this.myForm.valid) {
      this.category.addCategory(category).subscribe(
        (data: { message: string; data: Category; isSuccess: boolean; status: boolean }) => {
          this._snackBar.open(`${data.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.router.navigate(['admin/category']);
        },
        ({ error }) => {
          this._snackBar.open(`${error.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        },
      );
    }
  }
}
