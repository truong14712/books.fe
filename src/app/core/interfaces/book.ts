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
  pageNumber: number;
  images: Image[];
  publisher: string;
  publicationYear: number;
  translator: string;
  language: string;
  size: string;
  weight: string;
  description?: string;
  categoryId: string;
  stock: number;
  coverType: boolean;
  status?: boolean;
}
