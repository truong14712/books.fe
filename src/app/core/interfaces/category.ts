interface Book {
  _id: string;
  nameBook: string;
}
export interface Category {
  _id?: string;
  nameCategory: string;
  description: string;
  books?: Book[];
}
