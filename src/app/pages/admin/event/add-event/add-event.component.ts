import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { coverType } from '@core/constants/coverType';
import { language } from '@core/constants/language';
import { statusEventType } from '@core/constants/statusEventType';
import { Category } from '@core/interfaces/category';
import { CategoryService } from '@core/services/category/category.service';
import { EventService } from '@core/services/event/event.service';
import { noWhitespaceValidator } from '@core/validation/noWhitespaceValidator';
import { validateDateNotInPast } from '@core/validation/validateDateNotInPast';
import { validateToDateEvent } from '@core/validation/validateToDateEvent';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent implements OnInit {
  images!: any;
  listCategory: Category[] = [];
  categoryId = '';
  newBook!: any;
  coverType = '';
  listLanguage = language;
  listCoverType = coverType;
  listStatusEventType = statusEventType;
  language = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  myForm = this.FormBuilder.group({
    nameBook: ['', [Validators.required, Validators.minLength(6), noWhitespaceValidator]],
    auth: ['', [Validators.required, Validators.minLength(6), noWhitespaceValidator]],
    price: [0, [Validators.required, noWhitespaceValidator]],
    discountPrice: [0, [Validators.required, noWhitespaceValidator]],
    description: ['', [Validators.required]],
    pageNumber: [0, [Validators.required]],
    publisher: ['', [Validators.required, Validators.minLength(6)]],
    publicationYear: [0, [Validators.required]],
    translator: ['', [Validators.required]],
    size: ['', [Validators.required]],
    weight: [0, [Validators.required]],
    brand: ['', Validators.required],
    stock: [0, [Validators.required]],
    selectedLanguage: [this.language, Validators.required],
    selectedCoverType: [this.coverType, Validators.required],
    selectedCategoryId: [this.categoryId, Validators.required],
    start_Date: [null, [Validators.required, validateDateNotInPast]],
    finish_Date: [null, [Validators.required, validateToDateEvent, validateDateNotInPast]],
    status_Date: ['', [Validators.required]],
  });
  constructor(
    private FormBuilder: FormBuilder,
    private event: EventService,
    private category: CategoryService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit() {
    this.category.getAllCategory().subscribe((data) => {
      const { docs } = data.data;
      this.listCategory = docs;
    });
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
    this.language = language;
  }
  onSelectionChange(coverType: string) {
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
      formData.append('discountPrice', formValue.discountPrice);
      formData.append('publicationYear', formValue.publicationYear);
      formData.append('publisher', formValue.publisher);
      formData.append('size', formValue.size);
      formData.append('translator', formValue.translator);
      formData.append('nameBook', formValue.nameBook);
      formData.append('weight', formValue.weight);
      formData.append('stock', formValue.stock);
      formData.append('brand', formValue.brand);
      formData.append('start_Date', formValue.start_Date);
      formData.append('finish_Date', formValue.finish_Date);
      formData.append('status_Date', formValue.status_Date);
      formData.append('categoryId', this.categoryId);
      this.images.forEach((file: File) => {
        formData.append('images', file);
      });
      formData.append('coverType', this.coverType);
      this.newBook = formData;
      this.event.addEvent(this.newBook).subscribe(
        (data: { isSuccess: boolean; status: number; message: string; data: any }) => {
          this._snackBar.open(`${data.message}`, 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.router.navigate(['admin/event']);
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
