import { Component, OnInit } from '@angular/core';
import { CategoryService } from '@core/services/category/category.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '@core/interfaces/book';
import * as moment from 'moment';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
})
export class CategoryDetailComponent implements OnInit {
  listBook: Book[] = [];
  nameCategory = '';
  totalPage!: number;
  currentPage = 1;
  itemsPerPage = 20;
  isLoading = true;
  constructor(
    private category: CategoryService,
    private ActivatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.ActivatedRoute.paramMap.subscribe((params) => {
      const id = String(params.get('id'));
      this.category.getBooksByCategory(id).subscribe(({ data }) => {
        this.isLoading = false;
        this.listBook = data;
        this.totalPage = Math.ceil(this.listBook.length / this.itemsPerPage);
      });
      this.category.getOneCategory(id).subscribe(({ data }) => {
        this.nameCategory = data.nameCategory;
      });
    });
  }
  convertToRelativeTime(timestamp: string): string {
    const now = moment();
    const timeAgo = moment(timestamp);
    const duration = moment.duration(now.diff(timeAgo));
    const daysAgo = Math.floor(duration.asDays());
    return `${daysAgo} days ago`;
  }
  roundPercentage(percentage: number) {
    return Math.round(percentage);
  }
  handlePageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}
