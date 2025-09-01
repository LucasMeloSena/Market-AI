import { Prisma } from 'generated/prisma';

export type CartWithRelations = Prisma.CartGetPayload<{
  include: {
    store: true;
    user: true;
    CartItem: {
      include: {
        product: true;
      };
    };
  };
}>;
