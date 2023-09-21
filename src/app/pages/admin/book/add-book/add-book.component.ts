import { Book } from '@core/interfaces/book';
import { BookService } from '@core/services/book/book.service';
import { Category } from '@core/interfaces/category';
import { CategoryService } from '@core/services/category/category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { language } from '@core/utils/language';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  images!: any;
  listCategory: Category[] = [];
  categoryId = '';
  newBook!: any;
  coverType!: boolean;
  listLanguage = language;
  language!: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  myForm = this.FormBuilder.group({
    nameBook: ['', [Validators.required, Validators.minLength(6)]],
    auth: ['', [Validators.required, Validators.minLength(6)]],
    price: [0, [Validators.required]],
    description: ['', [Validators.required]],
    pageNumber: [0, [Validators.required]],
    publisher: [0, [Validators.required, Validators.minLength(6)]],
    publicationYear: ['', [Validators.required]],
    translator: ['', [Validators.required]],
    size: ['', [Validators.required]],
    weight: [0, [Validators.required]],
  });
  constructor(
    private FormBuilder: FormBuilder,
    private book: BookService,
    private category: CategoryService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit() {
    this.category.getAllCategory().subscribe(
      (data) => {
        const { docs } = data.data;
        this.listCategory = docs;
      },
      (error) => {
        console.error(error);
      },
    );
  }
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement.files) return;
    const files: File[] = Array.from(inputElement.files);

    if (files.length > 0) {
      this.images = files;
    }
  }
  onCategorySelection(categoryId: string) {
    this.categoryId = categoryId;
  }
  onLanguageSelection(language: string) {
    console.log(language);
    this.language = language;
  }
  onSelectionChange(coverType: boolean) {
    this.coverType = coverType;
  }
  onSubmit() {
    if (this.myForm.valid) {
      const formValue: any = this.myForm?.value;
      const formData = new FormData();
      formData.append('auth', formValue.auth);
      formData.append('description', formValue.description);
      formData.append('language', this.language);
      formData.append('pageNumber', formValue.pageNumber);
      formData.append('price', formValue.price);
      formData.append('publicationYear', formValue.publicationYear);
      formData.append('publisher', formValue.publisher);
      formData.append('size', formValue.size);
      formData.append('translator', formValue.translator);
      formData.append('nameBook', formValue.nameBook);
      formData.append('weight', formValue.weight);
      formData.append('categoryId', this.categoryId);
      this.images.forEach((file: File) => {
        formData.append('images', file);
      });
      formData.append('coverType', this.coverType.toString());
      this.newBook = formData;
      this.book.addBook(this.newBook).subscribe(
        (data: { isSuccess: boolean; status: number; message: string; data: Book }) => {
          this._snackBar.open(`${data.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.router.navigate(['admin/book']);
        },
        (error) => {
          this._snackBar.open(`${error.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        },
      );
    }
  }
}
