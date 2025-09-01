import { Store } from './store';

export class Product {
  id: string;
  name: string;
  price: number;
  embedding: number[];
  store: Store;

  constructor(
    id: string,
    name: string,
    price: number,
    embedding: number[],
    store: Store,
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.embedding = embedding;
    this.store = store;
  }
}
