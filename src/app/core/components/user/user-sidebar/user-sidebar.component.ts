import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '@core/interfaces/category';
import { BookService } from '@core/services/book/book.service';
import { CategoryService } from '@core/services/category/category.service';
import { priceFilter } from '@core/constants/priceFilter';
import { Price } from '@core/interfaces/priceFilter';
import { Selected, getDisplayedItems, getRemainingItems } from '@core/utils/showAndLess';
import { Book } from '@core/interfaces/book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css'],
})
export class UserSidebarComponent implements OnInit {
  @Input() listBook!: Book[];
  @Output() listBookChange: EventEmitter<Book[]> = new EventEmitter<Book[]>();
  listCategory: Category[] = [];
  listPrice = priceFilter;
  showMoreContent = false;
  initialItemCount = 5;
  showLessItemCount = 3;
  getAllPublishers: [name: string, isChecked: boolean][] = [];
  getAllAuth: [name: string, isChecked: boolean][] = [];
  getAllCoverType: [name: string, isChecked: boolean][] = [];
  showMorePublisher = false;
  showMoreAuthor = false;
  showMoreCoverType = false;

  initialItemCountPublisher = 5;
  showLessItemCountPublisher = 5;

  initialItemCountAuth = 5;
  showLessItemCountAuth = 5;

  initialItemCountCoverType = 5;
  showLessItemCountCoverType = 5;
  maxLines = 4;

  selectedCheckboxIndexPrice = -1;
  selectedCheckboxIndexPublishers = -1;
  selectedCheckboxIndexAuth = -1;
  selectedCheckboxIndexCoverType = -1;
  constructor(
    private category: CategoryService,
    private book: BookService,
    private router: Router,
  ) {
    book.getAllPublishers().subscribe(({ data }) => {
      this.getAllPublishers = data.map((name: { name: string; isChecked: boolean }) => ({
        name,
        isChecked: false,
      }));
    });
    book.getAllAuth().subscribe(({ data }) => {
      this.getAllAuth = data.map((name: { name: string; isChecked: boolean }) => ({
        name,
        isChecked: false,
      }));
    });
    book.getAllCoverType().subscribe(({ data }) => {
      this.getAllCoverType = data.map((name: { name: string; isChecked: boolean }) => ({
        name,
        isChecked: false,
      }));
    });
  }

  ngOnInit() {
    this.category.getAllCategory().subscribe((data) => {
      this.listCategory = data.data.docs.length > 0 ? data.data.docs : [];
    });
    this.book.getAllBookIsHighlighted().subscribe((data) => {
      this.listBook = data.data.docs;
      this.listBookChange.emit(this.listBook);
    });
  }

  showMore() {
    this.showMoreContent = true;
  }
  showLess() {
    this.showMoreContent = false;
  }
  showMorePublishers() {
    this.showMorePublisher = true;
  }
  showLessPublishers() {
    this.showMorePublisher = false;
  }
  showMoreAuth() {
    this.showMoreAuthor = true;
  }
  showLessAuth() {
    this.showMoreAuthor = false;
  }
  showMoreCoverTypes() {
    this.showMoreCoverType = true;
  }
  showLessCoverType() {
    this.showMoreCoverType = false;
  }
  // hidden Present coverType
  getDisplayedItemsCoverType() {
    return getDisplayedItems(this.showMoreCoverType, this.getAllCoverType, this.showLessItemCountCoverType);
  }
  getRemainingItemsCoverType() {
    return getRemainingItems(
      this.showMoreCoverType,
      this.showLessItemCountCoverType,
      this.getAllCoverType,
      this.initialItemCountCoverType,
    );
  }
  // hidden Present auth
  getDisplayedItemsAuthors() {
    return getDisplayedItems(this.showMoreAuthor, this.getAllAuth, this.showLessItemCountAuth);
  }
  getRemainingItemsAuthors() {
    return getRemainingItems(
      this.showMoreAuthor,
      this.showLessItemCountAuth,
      this.getAllAuth,
      this.initialItemCountAuth,
    );
  }
  // hidden Present Publishers
  getDisplayedItemsPublishers() {
    return getDisplayedItems(this.showMorePublisher, this.getAllPublishers, this.showLessItemCountPublisher);
  }

  getRemainingItemsPublishers() {
    return getRemainingItems(
      this.showMorePublisher,
      this.showLessItemCountPublisher,
      this.getAllPublishers,
      this.initialItemCountPublisher,
    );
  }

  getDisplayedItemsCategory(): Category[] {
    return getDisplayedItems(this.showMoreContent, this.listCategory, this.showLessItemCount);
  }

  getRemainingItemsCategory(): Category[] {
    return getRemainingItems(this.showMoreContent, this.showLessItemCount, this.listCategory, this.initialItemCount);
  }
  // filter price
  priceFilter(minPrice: number, maxPrice: number) {
    this.router.navigate(['/'], {
      queryParams: { minPrice, maxPrice },
    });
    this.book.searchPrice(`${minPrice}-${maxPrice}`).subscribe(({ data }) => {
      this.listBook = data;
      this.listBookChange.emit(this.listBook);
    });
  }
  onChangeCheckbox(price: Price) {
    if (!price.isChecked) {
      this.selectedCheckboxIndexPrice = -1;
      this.ngOnInit();
    }
  }

  toggleCheckbox(price: Price) {
    const currentIndex = this.listPrice.indexOf(price);
    const isCurrentIndexSelected = currentIndex === this.selectedCheckboxIndexPrice;

    if (!isCurrentIndexSelected) {
      this.listPrice.forEach((p) => {
        p.isChecked = false;
      });

      this.selectedCheckboxIndexPrice = currentIndex;
      price.isChecked = true;
      this.priceFilter(price.minPrice, price.maxPrice);
    } else {
      this.selectedCheckboxIndexPrice = -1;
      price.isChecked = false;
      this.router.navigate(['/']);
      this.ngOnInit();
    }
  }
  isSelected(price: Price) {
    return Selected(this.listPrice, price, this.selectedCheckboxIndexPrice);
  }

  isSelectedPublishers(publisher: { name: string; isChecked: boolean }) {
    return Selected(this.getAllPublishers, publisher, this.selectedCheckboxIndexPublishers);
  }

  isSelectedAuth(auth: { name: string; isChecked: boolean }) {
    return Selected(this.getAllAuth, auth, this.selectedCheckboxIndexAuth);
  }
  isSelectedCoverType(coverType: { name: string; isChecked: boolean }) {
    return Selected(this.getAllCoverType, coverType, this.selectedCheckboxIndexCoverType);
  }
  // filter publisher
  toggleCheckboxPublishers(publisher: any) {
    const currentIndex = this.getAllPublishers.indexOf(publisher);
    const isCurrentIndexSelected = currentIndex === this.selectedCheckboxIndexPublishers;

    if (!isCurrentIndexSelected) {
      this.getAllPublishers.map((p: any) => {
        p.isChecked = false;
      });

      this.selectedCheckboxIndexPublishers = currentIndex;
      publisher.isChecked = true;
      this.publisherNameFilter(publisher.name);
    } else {
      this.selectedCheckboxIndexPublishers = -1;
      publisher.isChecked = false;
      this.router.navigate(['/']);
      this.ngOnInit();
    }
  }
  onChangeCheckboxPublishers(publisher: { name: string; isChecked: boolean }) {
    if (!publisher.isChecked) {
      this.selectedCheckboxIndexPublishers = -1;
      this.ngOnInit();
    }
  }
  publisherNameFilter(query: string) {
    this.router.navigate(['/'], {
      queryParams: { query },
    });
    this.book.searchPublisherName(query).subscribe(({ data }) => {
      this.listBook = data;
      this.listBookChange.emit(this.listBook);
    });
  }

  // filter auth
  onChangeCheckboxAuth(auth: { name: string; isChecked: boolean }) {
    if (!auth.isChecked) {
      this.selectedCheckboxIndexAuth = -1;
      this.ngOnInit();
    }
  }
  toggleCheckboxAuth(auth: any) {
    const currentIndex = this.getAllAuth.indexOf(auth);
    const isCurrentIndexSelected = currentIndex === this.selectedCheckboxIndexAuth;

    if (!isCurrentIndexSelected) {
      this.selectedCheckboxIndexAuth = currentIndex;
      auth.isChecked = true;
      this.authFilter(auth.name);
    } else {
      this.selectedCheckboxIndexAuth = -1;
      auth.isChecked = false;
      this.ngOnInit();
      this.router.navigate(['/']);
    }
  }
  authFilter(query: string) {
    this.router.navigate(['/'], {
      queryParams: { query },
    });
    this.book.searchAuthName(query).subscribe(({ data }) => {
      this.listBook = data;
      this.listBookChange.emit(this.listBook);
    });
  }

  // filter coverType
  onChangeCheckboxCoverType(coverType: { name: string; isChecked: boolean }) {
    if (!coverType.isChecked) {
      this.selectedCheckboxIndexCoverType = -1;
      this.ngOnInit();
    }
  }
  toggleCheckboxCoverType(coverType: any) {
    const currentIndex = this.getAllCoverType.indexOf(coverType);
    const isCurrentIndexSelected = currentIndex === this.selectedCheckboxIndexCoverType;

    if (!isCurrentIndexSelected) {
      this.selectedCheckboxIndexCoverType = currentIndex;
      coverType.isChecked = true;
      this.coverTypeFilter(coverType.name);
    } else {
      this.selectedCheckboxIndexCoverType = -1;
      coverType.isChecked = false;
      this.ngOnInit();
      this.router.navigate(['/']);
    }
  }
  coverTypeFilter(query: string) {
    this.router.navigate(['/'], {
      queryParams: { query },
    });
    this.book.searchCoverType(query).subscribe(({ data }) => {
      this.listBook = data;
      this.listBookChange.emit(this.listBook);
    });
  }
}
