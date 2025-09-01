import { api } from "../axios";

export async function removeProduct(userId: string, productId: string): Promise<void> {
  await api.delete(`/cart/${userId}/product/${productId}`);
}