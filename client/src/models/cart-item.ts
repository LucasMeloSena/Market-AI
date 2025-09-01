import { Product } from "./product";

export class CartItem {
  id: string;
  quantity: number;
  product: Product;

  constructor(id: string, quantity: number, product: Product) {
    this.id = id;
    this.quantity = quantity;
    this.product = product;
  }
}
