import { CartItem, User } from 'generated/prisma';
import { Store } from './store';

export class Cart {
  id: string;
  active: boolean;
  store: Store;
  user: User;
  items: CartItem[];

  constructor(
    id: string,
    active: boolean,
    store: Store,
    user: User,
    items: CartItem[],
  ) {
    this.id = id;
    this.active = active;
    this.store = store;
    this.user = user;
    this.items = items;
  }
}
