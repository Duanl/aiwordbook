// 用户相关类型
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  dailyGoal: number;
  streak: number;
  wordsLearned: number;
  createdAt: string;
  lastActive: string;
}

// 单词相关类型
export interface Word {
  id: string;
  word: string;
  phonetic: string;
  meaning: string;
  partOfSpeech?: string;
  examples: string[];
  aiMemory?: string;
  aiImageUrl?: string;
  masteryLevel: MasteryLevel;
  nextReview?: string;
  reviewCount: number;
  easeFactor: number;
}

export type MasteryLevel = 'NEW' | 'LEARNING' | 'MASTERED';

// 学习相关类型
export type LearningStatus = 'KNOWN' | 'FUZZY' | 'UNKNOWN';

export interface LearningRecord {
  id: string;
  wordId: string;
  status: LearningStatus;
  responseTime: number;
  createdAt: string;
}

export interface LearningTask {
  newWords: Word[];
  reviewWords: Word[];
  totalToday: number;
}

export interface LearningStats {
  streak: number;
  wordsLearned: number;
  todayLearned: number;
  weeklyStats: {
    date: string;
    count: number;
  }[];
}

// 词库相关类型
export interface WordBook {
  id: string;
  name: string;
  category: WordCategory;
  wordCount: number;
  createdAt: string;
}

export type WordCategory = 'cet4' | 'cet6' | 'kaoyan' | 'ielts' | 'toefl' | 'custom';

// API响应类型
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

// 认证相关类型
export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// AI生成内容类型
export interface AIMemoryContent {
  memory: string;
  examples: string[];
  imageUrl?: string;
}
