import { ChatSession } from "@/models/chat-session";
import { api } from "../axios";

export async function getChatSession(sessionId: string): Promise<ChatSession> {
  const response = await api.get(`/chat/${sessionId}`);

  return response.data as ChatSession;
}