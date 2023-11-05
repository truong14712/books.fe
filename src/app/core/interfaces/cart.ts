export interface Cart {
  userId: string;
  books: [
    {
      bookId: string;
      quantity: number;
    },
  ];
}
