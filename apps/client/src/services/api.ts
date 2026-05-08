import type { ApiResponse, User, Word, LearningTask, LearningStats, AuthResponse, AIMemoryContent, LoginDTO, RegisterDTO, LearningStatus } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiClient {
  private token: string | null = localStorage.getItem('vocab_token');

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('vocab_token', token);
    } else {
      localStorage.removeItem('vocab_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Request failed');
    }

    return data.data as T;
  }

  async login(dto: LoginDTO): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || 'Login failed');
    }
    this.setToken(data.data.token);
    return data.data;
  }

  async register(dto: RegisterDTO): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || 'Registration failed');
    }
    this.setToken(data.data.token);
    return data.data;
  }

  logout() {
    this.setToken(null);
  }

  async getProfile(): Promise<User> {
    return this.request<User>('/auth/me');
  }

  async getWords(params?: { category?: string; page?: number; limit?: number }): Promise<{ data: Word[]; meta: { total: number; page: number } }> {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.page) query.append('page', String(params.page));
    if (params?.limit) query.append('limit', String(params.limit));
    
    return this.request(`${'/words'}?${query.toString()}`);
  }

  async getWord(id: string): Promise<Word> {
    return this.request<Word>(`/words/${id}`);
  }

  async generateAIMemory(word: string, meaning: string): Promise<AIMemoryContent> {
    return this.request<AIMemoryContent>('/words/ai/generate', {
      method: 'POST',
      body: JSON.stringify({ word, meaning }),
    });
  }

  async getTodayTask(): Promise<LearningTask> {
    return this.request<LearningTask>('/learning/today');
  }

  async getReviewWords(): Promise<Word[]> {
    return this.request<Word[]>('/learning/review');
  }

  async submitLearning(wordId: string, status: LearningStatus, responseTime: number): Promise<{ wordId: string; nextReview: string; masteryLevel: string }> {
    return this.request('/learning/submit', {
      method: 'POST',
      body: JSON.stringify({ wordId, status, responseTime }),
    });
  }

  async getStats(): Promise<LearningStats> {
    return this.request<LearningStats>('/learning/stats');
  }

  async getWordBooks() {
    return this.request('/wordbooks');
  }

  async createWordBook(data: { name: string; category: string }) {
    return this.request('/wordbooks', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiClient();
