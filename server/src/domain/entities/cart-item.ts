import { Product } from 'generated/prisma';

export class CartItem {
  id: string;
  quantity: number;
  product: Product;
}
