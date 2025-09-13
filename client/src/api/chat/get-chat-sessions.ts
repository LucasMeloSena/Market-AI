import { ChatSession } from "@/models/chat-session";
import { api } from "../axios";

export async function getChatSessions(): Promise<ChatSession[]> {
  const response = await api.get("/chat");
  return response.data as ChatSession[];
};