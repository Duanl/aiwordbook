import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import WordCard from './WordCard';
import type { Word } from '../types';

const mockWord: Word = {
  id: 'word-123',
  word: 'test',
  phonetic: '/test/',
  meaning: '测试',
  partOfSpeech: 'verb',
  examples: ['This is a test.', 'I need to test it.'],
  masteryLevel: 'NEW',
  createdAt: new Date().toISOString(),
};

describe('WordCard', () => {
  it('renders word correctly', () => {
    render(
      <WordCard
        word={mockWord}
        isFlipped={false}
        onFlip={() => {}}
      />
    );

    expect(screen.getByText('test')).toBeDefined();
    expect(screen.getByText('/test/')).toBeDefined();
  });

  it('displays "点击卡片查看释义" when not flipped', () => {
    render(
      <WordCard
        word={mockWord}
        isFlipped={false}
        onFlip={() => {}}
      />
    );

    expect(screen.getByText('点击卡片查看释义')).toBeDefined();
  });

  it('shows meaning when flipped', () => {
    render(
      <WordCard
        word={mockWord}
        isFlipped={true}
        onFlip={() => {}}
      />
    );

    expect(screen.getByText('测试')).toBeDefined();
    expect(screen.queryByText('点击卡片查看释义')).toBeNull();
  });

  it('calls onFlip when card is clicked', () => {
    const onFlipMock = vi.fn();
    render(
      <WordCard
        word={mockWord}
        isFlipped={false}
        onFlip={onFlipMock}
      />
    );

    const card = screen.getByText('test').closest('div');
    if (card) {
      fireEvent.click(card);
    }

    expect(onFlipMock).toHaveBeenCalled();
  });

  it('displays AI memory when provided and flipped', () => {
    render(
      <WordCard
        word={mockWord}
        isFlipped={true}
        onFlip={() => {}}
        aiMemory="记忆口诀：test 测试，像考试一样"
      />
    );

    expect(screen.getByText('AI记忆口诀')).toBeDefined();
    expect(screen.getByText('记忆口诀：test 测试，像考试一样')).toBeDefined();
  });

  it('does not display AI memory when not flipped', () => {
    render(
      <WordCard
        word={mockWord}
        isFlipped={false}
        onFlip={() => {}}
        aiMemory="记忆口诀：test 测试，像考试一样"
      />
    );

    expect(screen.queryByText('AI记忆口诀')).toBeNull();
  });

  it('displays examples when provided and flipped', () => {
    render(
      <WordCard
        word={mockWord}
        isFlipped={true}
        onFlip={() => {}}
        examples={['This is a test.', 'I need to test it.']}
      />
    );

    expect(screen.getByText('This is a test.')).toBeDefined();
  });

  it('displays part of speech when available', () => {
    render(
      <WordCard
        word={mockWord}
        isFlipped={false}
        onFlip={() => {}}
      />
    );

    expect(screen.getByText('verb')).toBeDefined();
  });

  it('shows action buttons when flipped', () => {
    render(
      <WordCard
        word={mockWord}
        isFlipped={true}
        onFlip={() => {}}
      />
    );

    expect(screen.getByText('不认识')).toBeDefined();
    expect(screen.getByText('模糊')).toBeDefined();
    expect(screen.getByText('认识')).toBeDefined();
  });

  it('hides action buttons when not flipped', () => {
    render(
      <WordCard
        word={mockWord}
        isFlipped={false}
        onFlip={() => {}}
      />
    );

    expect(screen.queryByText('不认识')).toBeNull();
    expect(screen.queryByText('模糊')).toBeNull();
    expect(screen.queryByText('认识')).toBeNull();
  });
});
