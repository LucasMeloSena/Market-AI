import { api } from "../axios";
import { CartBody } from "./add-to-cart";

export async function updateCartQuantity(cartId: string, cartParams: CartBody): Promise<void> {
  await api.patch(`/cart/${cartId}`, cartParams);
}