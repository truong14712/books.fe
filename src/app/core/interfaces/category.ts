interface Book {
  _id: string;
  nameBook: string;
}
export interface Category {
  _id?: string;
  nameCategory: string;
  slug?: string;
  description: string;
  books?: Book[];
}
