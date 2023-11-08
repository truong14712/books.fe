import { Price } from '@core/interfaces/priceFilter';

export const priceFilter: Price[] = [
  {
    index: 0,
    name: '0đ - 150.000đ',
    minPrice: 0,
    maxPrice: 150000,
    isChecked: false,
  },
  {
    index: 1,
    name: '150.000đ - 300.000đ',
    minPrice: 150000,
    maxPrice: 300000,
    isChecked: false,
  },
  {
    index: 2,
    name: '300.000đ - 500.000đ',
    minPrice: 300000,
    maxPrice: 500000,
    isChecked: false,
  },
  {
    index: 3,
    name: '500.000đ - 700.000đ',
    minPrice: 500000,
    maxPrice: 700000,
    isChecked: false,
  },
  {
    index: 4,
    name: '700.000đ - Trở Lên',
    minPrice: 700000,
    maxPrice: 1000000,
    isChecked: false,
  },
];
