import { api } from "../axios";

export const confirmAction = async (actionId: string, sessionId: string) => {
  const response = await api.post(`/chat/${sessionId}/actions/${actionId}/confirm`);
  return response.data
}