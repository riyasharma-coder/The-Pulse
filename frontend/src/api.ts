import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  emotion?: string;
  confidence?: number;
  timestamp: string;
}

export interface Analytics {
  mood_trends: { date: string; emotion: string; count: number }[];
  top_emotions: { emotion: string; count: number }[];
  total_messages: number;
  weekly_insight?: string;
}

export const sendMessage = async (message: string, userId: string = 'default') => {
  const response = await api.post<Message>('/chat', { message, user_id: userId });
  return response.data;
};

export const getHistory = async (userId: string = 'default') => {
  const response = await api.get<Message[]>(`/history/${userId}`);
  return response.data;
};

export const clearHistory = async (userId: string = 'default') => {
  const response = await api.delete(`/history/${userId}`);
  return response.data;
};

export const getAnalytics = async (userId: string = 'default') => {
  const response = await api.get<Analytics>(`/analytics/${userId}`);
  return response.data;
};
