// src/features/products/productTypes.ts
export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  eventStartTime: string;
  eventEndTime: string;
}
