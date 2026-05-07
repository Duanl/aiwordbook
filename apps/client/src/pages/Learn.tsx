import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2 } from 'lucide-react';
import { useWordStore } from '../stores/wordStore';
import { useUserStore } from '../stores/userStore';
import WordCard from '../components/WordCard';

// 模拟单词数据
const mockWords = [
  {
    id: '1',
    word: 'ephemeral',
    phonetic: '/ɪˈfem.ər.əl/',
    meaning: 'adj. 短暂的；瞬息的',
    partOfSpeech: '形容词',
    examples: [
      'Fashion trends are often ephemeral. 时尚潮流往往是短暂的。',
      'The ephemeral beauty of cherry blossoms makes them more precious. 樱花短暂的美丽使它们更加珍贵。',
    ],
    masteryLevel: 'NEW' as const,
    reviewCount: 0,
    easeFactor: 2.5,
  },
  {
    id: '2',
    word: 'ubiquitous',
    phonetic: '/juːˈbɪk.wɪ.təs/',
    meaning: 'adj. 无处不在的；普遍存在的',
    partOfSpeech: '形容词',
    examples: [
      'Smartphones have become ubiquitous in modern society. 智能手机在现代社会已经无处不在。',
      'Coffee shops are ubiquitous in this city. 咖啡店在这个城市随处可见。',
    ],
    masteryLevel: 'NEW' as const,
    reviewCount: 0,
    easeFactor: 2.5,
  },
  {
    id: '3',
    word: 'pragmatic',
    phonetic: '/præɡˈmæt.ɪk/',
    meaning: 'adj. 务实的；实际的',
    partOfSpeech: '形容词',
    examples: [
      'We need a pragmatic approach to solve this problem. 我们需要一个务实的方法来解决这个问题。',
      'She is known for her pragmatic decision-making. 她以务实的决策而闻名。',
    ],
    masteryLevel: 'NEW' as const,
    reviewCount: 0,
    easeFactor: 2.5,
  },
];

const Learn: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUserStore();
  const { 
    words, 
    currentIndex, 
    currentWord, 
    aiContent, 
    isFlipped, 
    learnedCount,
    setWords, 
    flipCard,
    nextWord,
    submitAnswer,
    generateAIContent,
    reset 
  } = useWordStore();

  const [showAIContent, setShowAIContent] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    
    // 加载单词
    if (words.length === 0) {
      setWords(mockWords);
    }

    return () => {
      // cleanup
    };
  }, [isAuthenticated, navigate, words.length, setWords]);

  useEffect(() => {
    if (currentWord && isFlipped && !aiContent && !showAIContent) {
      setShowAIContent(true);
      setIsGeneratingAI(true);
      generateAIContent().finally(() => {
        setIsGeneratingAI(false);
      });
    }
  }, [currentWord, isFlipped]);

  const handleSubmit = async (status: 'KNOWN' | 'FUZZY' | 'UNKNOWN') => {
    const startTime = Date.now();
    try {
      await submitAnswer(status, Date.now() - startTime);
      setShowAIContent(false);
    } catch (error) {
      console.error('提交失败:', error);
    }
  };

  const handleNext = () => {
    nextWord();
    setShowAIContent(false);
  };

  if (!currentWord) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎉 今日学习任务已完成！</h2>
          <p className="text-gray-600 mb-6">你已学习了 {learnedCount} 个单词</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* 顶部导航 */}
      <header className="bg-white shadow-sm">
        <div className="container-custom py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <span className="text-gray-600">
              {currentIndex + 1} / {words.length}
            </span>
          </div>
          
          {/* 进度条 */}
          <div className="flex-1 mx-8">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full gradient-primary transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
              />
            </div>
          </div>

          <span className="text-primary-500 font-semibold">
            {learnedCount} 已学
          </span>
        </div>
      </header>

      {/* 学习内容区 */}
      <main className="container-custom py-12">
        <div className="flex flex-col items-center">
          {/* 单词卡片 */}
          <WordCard
            word={currentWord}
            isFlipped={isFlipped}
            onFlip={flipCard}
            aiMemory={showAIContent ? aiContent?.memory || currentWord.word + '是一个重要词汇，需要好好记忆' : undefined}
            examples={showAIContent ? aiContent?.examples || currentWord.examples : undefined}
          />

          {/* AI生成中 */}
          {isGeneratingAI && (
            <div className="mt-4 text-cyan-500 animate-pulse">
              <span>🤖 AI正在生成记忆内容...</span>
            </div>
          )}

          {/* 操作按钮 */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full max-w-md">
            {!isFlipped ? (
              <button
                onClick={flipCard}
                className="flex-1 btn-primary text-lg py-4"
              >
                查看答案
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleSubmit('UNKNOWN')}
                  className="flex-1 px-8 py-4 bg-red-100 text-red-600 font-semibold rounded-full hover:bg-red-200 transition-colors"
                >
                  不认识
                </button>
                <button
                  onClick={() => handleSubmit('FUZZY')}
                  className="flex-1 px-8 py-4 bg-yellow-100 text-yellow-600 font-semibold rounded-full hover:bg-yellow-200 transition-colors"
                >
                  模糊
                </button>
                <button
                  onClick={() => handleSubmit('KNOWN')}
                  className="flex-1 px-8 py-4 bg-green-100 text-green-600 font-semibold rounded-full hover:bg-green-200 transition-colors"
                >
                  认识
                </button>
              </>
            )}
          </div>

          {/* 提示信息 */}
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>💡 点击卡片可翻转查看释义和AI生成的记忆内容</p>
            <p className="mt-2">根据记忆情况选择：不认识 / 模糊 / 认识</p>
          </div>
        </div>
      </main>

      {/* 底部导航 */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3">
        <button onClick={() => navigate('/')} className="flex flex-col items-center text-gray-400">
          <span className="text-2xl">🏠</span>
          <span className="text-xs mt-1">首页</span>
        </button>
        <button className="flex flex-col items-center text-primary-500">
          <span className="text-2xl">📚</span>
          <span className="text-xs mt-1">学习</span>
        </button>
        <button onClick={() => navigate('/review')} className="flex flex-col items-center text-gray-400">
          <span className="text-2xl">🔄</span>
          <span className="text-xs mt-1">复习</span>
        </button>
        <button onClick={() => navigate('/profile')} className="flex flex-col items-center text-gray-400">
          <span className="text-2xl">👤</span>
          <span className="text-xs mt-1">我的</span>
        </button>
      </nav>
    </div>
  );
};

export default Learn;
