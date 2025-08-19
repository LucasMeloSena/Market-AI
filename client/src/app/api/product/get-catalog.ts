import { Product } from "@/app/models/product";
import { api } from "../axios";

export async function getCatalog(search: string) {
  const response = await api.get("/product/catalog", {
    params: { search }
  })

  return response.data as Product[];
}