import { api } from "../axios";
import { Cart } from "@/models/cart";

export async function getCart(userId: string): Promise<Cart> {
  const response = await api.get(`/cart/?userId=${userId}`);

  return response.data as Cart;
}