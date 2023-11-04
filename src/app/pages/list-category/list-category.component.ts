import { Component, OnInit } from '@angular/core';
import { Category } from '@core/interfaces/category';
import { CategoryService } from '@core/services/category/category.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css'],
})
export class ListCategoryComponent implements OnInit {
  listCategory: Category[] = [];
  constructor(private category: CategoryService) {}

  ngOnInit() {
    this.category.getAllCategory().subscribe((data) => {
      this.listCategory = data.data.docs.length > 0 ? data.data.docs : [];
    });
  }
}
