export interface Coupon {
  _id: string;
  code: string;
  discount: number;
  description: string;
  minAmount: number;
  createdBy?: string;
  expirationDate: string;
  quantity: number;
}
