import { Prisma } from 'generated/prisma';

export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    store: true;
  };
}>;
