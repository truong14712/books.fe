import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { coverType } from '@core/constants/coverType';
import { language } from '@core/constants/language';
import { statusEventType } from '@core/constants/statusEventType';
import { Category } from '@core/interfaces/category';
import { CategoryService } from '@core/services/category/category.service';
import { EventService } from '@core/services/event/event.service';
import { validateDateNotInPast } from '@core/validation/validateDateNotInPast';
import { validateToDateEvent } from '@core/validation/validateToDateEvent';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css'],
})
export class UpdateEventComponent implements OnInit {
  images!: any;
  listCategory: Category[] = [];
  categoryId = '';
  newBook!: any;
  coverType = '';
  listLanguage = language;
  listCoverType = coverType;
  language = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  selectedCategoryId!: { _id: string };
  selectedCoverType!: string;
  selectedLanguage!: string;
  listStatusEventType = statusEventType;

  imageUrl!: [];
  myForm = this.FormBuilder.group({
    nameBook: ['', [Validators.required, Validators.minLength(6)]],
    auth: ['', [Validators.required, Validators.minLength(6)]],
    price: [0, [Validators.required]],
    discountPrice: [0, [Validators.required]],
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
    status_Date: ['', Validators.required],
  });

  constructor(
    private FormBuilder: FormBuilder,
    private event: EventService,
    private category: CategoryService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.category.getAllCategory().subscribe((data) => {
      const { docs } = data.data;
      this.listCategory = docs;
    });
    this.ActivatedRoute.paramMap.subscribe((params) => {
      const id = String(params.get('id'));
      this.event.getOneEvent(id).subscribe(({ data }) => {
        this.newBook = data;
        this.myForm.patchValue({
          nameBook: this.newBook.nameBook,
          auth: this.newBook.auth,
          price: this.newBook.price,
          discountPrice: this.newBook.discountPrice,
          description: this.newBook.description,
          pageNumber: this.newBook.pageNumber,
          publisher: this.newBook.publisher,
          publicationYear: this.newBook.publicationYear,
          translator: this.newBook.translator,
          size: this.newBook.size,
          weight: this.newBook.weight,
          brand: this.newBook.brand,
          stock: this.newBook.stock,
          selectedCoverType: this.newBook.coverType,
          selectedCategoryId: this.newBook.categoryId._id,
          selectedLanguage: this.newBook.language,
          start_Date: this.newBook.start_Date,
          finish_Date: this.newBook.finish_Date,
          status_Date: this.newBook.status_Date,
        });
        this.selectedCategoryId = this.newBook.categoryId;
        this.selectedCoverType = this.newBook.coverType;
        this.selectedLanguage = this.newBook.language;
        this.imageUrl = this.newBook.images;
      });
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
      this.ActivatedRoute.paramMap.subscribe((params) => {
        const id = String(params.get('id'));
        const formValue: any = this.myForm?.value;
        const formData = new FormData();
        formData.append('auth', formValue.auth);
        formData.append('description', formValue.description);
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
        formData.append('start_Date', formValue.start_Date);
        formData.append('finish_Date', formValue.finish_Date);
        formData.append('status_Date', formValue.status_Date);
        formData.append('brand', formValue.brand);
        if (this.categoryId) {
          formData.append('categoryId', this.categoryId);
        } else {
          formData.append('categoryId', this.selectedCategoryId._id);
        }
        if (this.coverType) {
          formData.append('coverType', this.coverType);
        } else {
          formData.append('coverType', this.selectedCoverType);
        }
        if (this.language) {
          formData.append('language', this.language);
        } else {
          formData.append('language', this.selectedLanguage);
        }
        if (this.images) {
          this.images.forEach((file: File) => {
            formData.append('images', file);
          });
        } else {
          console.log('Khong co file');
        }
        this.newBook = formData;
        this.event.updateEvent(this.newBook, id).subscribe(
          (data: { isSuccess: boolean; status: number; message: string; data: any }) => {
            this._snackBar.open(`${data.message}`, 'OK', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 2000,
            });
            this.router.navigate(['admin/event']);
          },
          (error) => {
            this._snackBar.open(`${error.message}`, 'OK', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 2000,
            });
          },
        );
      });
    }
  }
}
