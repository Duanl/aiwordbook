import { create } from 'zustand';
import type { Word, LearningStatus, AIMemoryContent } from '../types';
import { api } from '../services/api';

interface WordState {
  words: Word[];
  currentIndex: number;
  currentWord: Word | null;
  aiContent: AIMemoryContent | null;
  isLoading: boolean;
  isFlipped: boolean;
  learnedCount: number;
  
  setWords: (words: Word[]) => void;
  nextWord: () => void;
  flipCard: () => void;
  submitAnswer: (status: LearningStatus, responseTime: number) => Promise<void>;
  generateAIContent: () => Promise<void>;
  reset: () => void;
}

export const useWordStore = create<WordState>((set, get) => ({
  words: [],
  currentIndex: 0,
  currentWord: null,
  aiContent: null,
  isLoading: false,
  isFlipped: false,
  learnedCount: 0,

  setWords: (words: Word[]) => {
    set({ 
      words, 
      currentIndex: 0, 
      currentWord: words[0] || null,
      isFlipped: false 
    });
  },

  nextWord: () => {
    const { words, currentIndex, learnedCount } = get();
    if (currentIndex < words.length - 1) {
      const nextIndex = currentIndex + 1;
      set({ 
        currentIndex: nextIndex, 
        currentWord: words[nextIndex],
        isFlipped: false,
        aiContent: null,
        learnedCount: learnedCount + 1
      });
    } else {
      set({ learnedCount: learnedCount + 1 });
    }
  },

  flipCard: () => {
    set((state) => ({ isFlipped: !state.isFlipped }));
  },

  submitAnswer: async (status: LearningStatus, responseTime: number) => {
    const { currentWord, nextWord } = get();
    if (!currentWord) return;

    try {
      await api.submitLearning(currentWord.id, status, responseTime);
      nextWord();
    } catch (error) {
      console.error('提交学习结果失败:', error);
      throw error;
    }
  },

  generateAIContent: async () => {
    const { currentWord } = get();
    if (!currentWord) return;

    try {
      const content = await api.generateAIMemory(currentWord.word, currentWord.meaning);
      set({ aiContent: content });
    } catch (error) {
      console.error('生成AI内容失败:', error);
    }
  },

  reset: () => {
    set({
      words: [],
      currentIndex: 0,
      currentWord: null,
      aiContent: null,
      isLoading: false,
      isFlipped: false,
      learnedCount: 0,
    });
  },
}));
