import { api } from "../axios"

export const chooseCartFromComparison = async (cartId: string) => {
  await api.post(`/chat/${cartId}/choose`)
}