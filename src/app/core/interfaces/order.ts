import { Book } from './book';

export interface Order {
  _id: string;
  cart: Book[];
  shippingAddress: {
    address: string;
    state: string;
    city: string;
    zipCode: number;
    addressType: string;
    status: boolean;
    country: string;
    admin_area_1?: string;
    admin_area_2?: string;
    country_code?: string;
    postal_code?: string;
  };
  userId: string;
  totalPrice: number;
  shippingFee: number;
  status: string;
  paymentInfo: {
    type: string;
    status: boolean;
  };
  orderId: string;
  reason?: string;
  paidAt?: string;
  deliveredAt: string;
}
