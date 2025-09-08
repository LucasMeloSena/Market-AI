import { Store } from './store';

export class Product {
  id: string;
  name: string;
  price: number;
  store?: Store;

  constructor(id: string, name: string, price: number, store: Store) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.store = store;
  }
}
