import { api } from "../axios";

export type CartBody = {
  userId: string;
  productId: string;
  quantity: number;
};

export async function addToCart(cartParams: CartBody): Promise<void> {
  await api.post("/cart", cartParams);
}