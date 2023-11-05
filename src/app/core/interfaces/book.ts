import { User } from './user';

interface Image {
  url: string;
  public_id: string;
  _id?: string;
}
export interface Book {
  _id: string;
  nameBook: string;
  auth: string;
  price: number;
  discountPrice: number;
  pageNumber: number;
  images: Image[];
  publisher: string;
  publicationYear: number;
  translator: string;
  language: string;
  size: string;
  weight: string;
  description: string;
  categoryId: Category;
  stock: number;
  coverType: boolean;
  status?: boolean;
  updatedAt: string;
  slug: string;
  quantity: number;
  isHighlighted: boolean;
  selected: boolean;
  createdAt: string;
  isReviewed?: boolean;
  ratings: number;
  reviews: [
    {
      _id: string;
      bookId: string;
      user: User;
      comment: string;
      rating: number;
      createdAt: string;
    },
  ];
  sold_out: number;
}
interface Category {
  _id?: string;
  nameCategory: string;
  slug: string;
  description: string;
  books?: Book[];
}
