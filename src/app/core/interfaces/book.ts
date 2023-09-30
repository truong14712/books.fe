interface Image {
  url: string;
  public_id: string;
  _id?: string;
}
export interface Book {
  _id?: string;
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
  updatedAt: any;
  slug: string;
  quantity?: number;
}
interface Category {
  _id?: string;
  nameCategory: string;
  slug: string;
  description: string;
  books?: Book[];
}
