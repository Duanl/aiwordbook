import React from 'react';
import { Volume2, Heart, Sparkles } from 'lucide-react';
import type { Word } from '../types';

interface WordCardProps {
  word: Word;
  isFlipped: boolean;
  onFlip: () => void;
  aiMemory?: string;
  examples?: string[];
}

const WordCard: React.FC<WordCardProps> = ({ word, isFlipped, onFlip, aiMemory, examples }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`relative min-h-[400px] bg-white rounded-3xl shadow-xl p-8 md:p-12 transition-all duration-500 ${
          isFlipped ? 'shadow-2xl' : ''
        }`}
        onClick={onFlip}
      >
        {/* 单词头部 */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              {word.word}
            </h2>
            <div className="flex items-center gap-2 text-gray-500">
              <span className="text-xl">{word.phonetic}</span>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            {word.partOfSpeech && (
              <span className="inline-block mt-2 px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium">
                {word.partOfSpeech}
              </span>
            )}
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Heart className="w-6 h-6 text-gray-400 hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* 翻页指示 */}
        {!isFlipped && (
          <div className="text-center text-gray-400 text-sm">
            点击卡片查看释义
          </div>
        )}

        {/* 翻页后的内容 */}
        {isFlipped && (
          <div className="space-y-6 animate-fade-in-up">
            {/* 释义 */}
            <div className="border-l-4 border-primary-500 pl-4">
              <p className="text-2xl text-gray-800 font-medium leading-relaxed">
                {word.meaning}
              </p>
            </div>

            {/* AI记忆口诀 */}
            {aiMemory && (
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-cyan-500" />
                  <span className="font-semibold text-cyan-600">AI记忆口诀</span>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {aiMemory}
                </p>
              </div>
            )}

            {/* 例句 */}
            {examples && examples.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700">例句</h4>
                {examples.map((example, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-800 mb-1">{example.split('。')[0]}</p>
                    {example.includes('。') && (
                      <p className="text-sm text-gray-500">{example.split('。')[1]}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 操作按钮 */}
      {isFlipped && (
        <div className="mt-8 flex justify-center gap-4 animate-fade-in-up">
          <button className="px-8 py-3 bg-red-100 text-red-600 font-semibold rounded-full hover:bg-red-200 transition-colors">
            不认识
          </button>
          <button className="px-8 py-3 bg-yellow-100 text-yellow-600 font-semibold rounded-full hover:bg-yellow-200 transition-colors">
            模糊
          </button>
          <button className="px-8 py-3 bg-green-100 text-green-600 font-semibold rounded-full hover:bg-green-200 transition-colors">
            认识
          </button>
        </div>
      )}
    </div>
  );
};

export default WordCard;
