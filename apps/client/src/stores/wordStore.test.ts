import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWordStore } from './wordStore';
import type { Word } from '../types';

vi.mock('../services/api', () => ({
  api: {
    submitLearning: vi.fn(),
    generateAIMemory: vi.fn(),
  },
}));

import { api } from '../services/api';

const mockWords: Word[] = [
  {
    id: 'word-1',
    word: 'test',
    phonetic: '/test/',
    meaning: '测试',
    partOfSpeech: 'verb',
    masteryLevel: 'NEW',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'word-2',
    word: 'example',
    phonetic: '/ɪɡˈzæmpəl/',
    meaning: '例子',
    partOfSpeech: 'noun',
    masteryLevel: 'NEW',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'word-3',
    word: 'learn',
    phonetic: '/lɜːrn/',
    meaning: '学习',
    partOfSpeech: 'verb',
    masteryLevel: 'NEW',
    createdAt: new Date().toISOString(),
  },
];

describe('useWordStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const { result } = renderHook(() => useWordStore());
    act(() => {
      result.current.reset();
    });
  });

  it('should have initial state', () => {
    const { result } = renderHook(() => useWordStore());
    expect(result.current.words).toEqual([]);
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.currentWord).toBeNull();
    expect(result.current.isFlipped).toBe(false);
    expect(result.current.learnedCount).toBe(0);
  });

  it('should set words', () => {
    const { result } = renderHook(() => useWordStore());

    act(() => {
      result.current.setWords(mockWords);
    });

    expect(result.current.words).toEqual(mockWords);
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.currentWord).toEqual(mockWords[0]);
  });

  it('should go to next word', () => {
    const { result } = renderHook(() => useWordStore());

    act(() => {
      result.current.setWords(mockWords);
    });

    act(() => {
      result.current.nextWord();
    });

    expect(result.current.currentIndex).toBe(1);
    expect(result.current.currentWord).toEqual(mockWords[1]);
    expect(result.current.learnedCount).toBe(1);
  });

  it('should flip card', () => {
    const { result } = renderHook(() => useWordStore());

    expect(result.current.isFlipped).toBe(false);

    act(() => {
      result.current.flipCard();
    });

    expect(result.current.isFlipped).toBe(true);

    act(() => {
      result.current.flipCard();
    });

    expect(result.current.isFlipped).toBe(false);
  });

  it('should reset learned count when going to next word after flip', () => {
    const { result } = renderHook(() => useWordStore());

    act(() => {
      result.current.setWords(mockWords);
    });

    act(() => {
      result.current.flipCard();
    });

    act(() => {
      result.current.nextWord();
    });

    expect(result.current.isFlipped).toBe(false);
  });

  it('should not go beyond last word', () => {
    const { result } = renderHook(() => useWordStore());

    act(() => {
      result.current.setWords(mockWords);
    });

    act(() => {
      result.current.nextWord();
    });
    act(() => {
      result.current.nextWord();
    });
    act(() => {
      result.current.nextWord();
    });

    expect(result.current.currentIndex).toBe(2);
    expect(result.current.learnedCount).toBe(3);
  });

  it('should submit answer and go to next word', async () => {
    (api.submitLearning as any).mockResolvedValue({ success: true });

    const { result } = renderHook(() => useWordStore());

    act(() => {
      result.current.setWords(mockWords);
    });

    await act(async () => {
      await result.current.submitAnswer('KNOWN', 3000);
    });

    expect(api.submitLearning).toHaveBeenCalledWith('word-1', 'KNOWN', 3000);
    expect(result.current.currentIndex).toBe(1);
  });

  it('should not submit if no current word', async () => {
    const { result } = renderHook(() => useWordStore());

    await act(async () => {
      await result.current.submitAnswer('KNOWN', 3000);
    });

    expect(api.submitLearning).not.toHaveBeenCalled();
  });

  it('should generate AI content', async () => {
    const mockAIContent = {
      memory: '记忆口诀',
      examples: ['例句1', '例句2'],
    };

    (api.generateAIMemory as any).mockResolvedValue(mockAIContent);

    const { result } = renderHook(() => useWordStore());

    act(() => {
      result.current.setWords(mockWords);
    });

    await act(async () => {
      await result.current.generateAIContent();
    });

    expect(api.generateAIMemory).toHaveBeenCalledWith('test', '测试');
    expect(result.current.aiContent).toEqual(mockAIContent);
  });

  it('should not generate AI content if no current word', async () => {
    const { result } = renderHook(() => useWordStore());

    await act(async () => {
      await result.current.generateAIContent();
    });

    expect(api.generateAIMemory).not.toHaveBeenCalled();
  });

  it('should reset state', () => {
    const { result } = renderHook(() => useWordStore());

    act(() => {
      result.current.setWords(mockWords);
    });

    act(() => {
      result.current.flipCard();
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.words).toEqual([]);
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.currentWord).toBeNull();
    expect(result.current.isFlipped).toBe(false);
    expect(result.current.learnedCount).toBe(0);
  });
});
