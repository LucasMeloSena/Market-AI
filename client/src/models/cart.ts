import { CartItem } from './cart-item';
import { Store } from './store';
import { User } from './user';

export class Cart {
  id: string;
  active: boolean;
  store: Store;
  user: User;
  items: CartItem[];
  total: number;

  constructor(
    id: string,
    active: boolean,
    store: Store,
    user: User,
    items: CartItem[],
    total: number
  ) {
    this.id = id;
    this.active = active;
    this.store = store;
    this.user = user;
    this.items = items;
    this.total = total;
  }
}
