import { api } from "../axios";

export const sendMessageToChat = async (sessionId: string, message: string) => {
    const response = await api.post(`/chat/${sessionId}/message`, {
      content: message,
    });
    return response.data;
}