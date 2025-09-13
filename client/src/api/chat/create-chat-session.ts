import { api } from "../axios";

export async function createChatSession(): Promise<string> {
  const response = await api.post("/chat");
  return response.data.data
}