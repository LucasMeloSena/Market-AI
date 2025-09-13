import { CartItem } from './cart-item';
import { Store } from './store';
import { User } from './user';

export class Cart {
  constructor(
    public id: string,
    public active: boolean,
    public store: Store,
    public score: number,
    public user: User,
    public items: CartItem[],
    public suggestedByMessageId?: string,
    public total: number = 0,
  ) {}
}
