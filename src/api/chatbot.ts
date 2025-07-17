import api from './index';

interface Message {
    role: string;
    content: string | Array<{text?: string; file?: string}>;
    liked?: boolean;
    disliked?: boolean;
  }

export const chatApi = {
    sendMessage: async (data: {
      query: string;
      message_history: Message[];
      file?: string | null;
    }) => {
      try {
        const response = await api.post('/api/chat', data);
        console.log(response);
        return response;
      } catch (error) {
        console.error('Error in chat API:', error);
        throw error;
      }
    }
}