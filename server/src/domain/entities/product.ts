import { Store } from './store';

export class Product {
  private id: string;
  private name: string;
  private price: number;
  private embedding: number[];
  private store: Store;

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
