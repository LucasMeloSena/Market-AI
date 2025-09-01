import { Product } from "@/models/product";
import { api } from "../axios";

export async function getCatalog(search: string): Promise<Product[]> {
  const response = await api.get("/product/catalog", {
    params: { search }
  })

  return response.data as Product[];
}