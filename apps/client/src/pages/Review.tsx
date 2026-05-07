import React from 'react';
import { Link } from 'react-router-dom';

const Review: React.FC = () => {
  const reviewWords = [
    {
      id: '1',
      word: 'ephemeral',
      meaning: '短暂的',
      mastery: 'LEARNING',
      nextReview: '今天',
    },
    {
      id: '2',
      word: 'ubiquitous',
      meaning: '无处不在的',
      mastery: 'LEARNING',
      nextReview: '今天',
    },
    {
      id: '3',
      word: 'pragmatic',
      meaning: '务实的',
      mastery: 'NEW',
      nextReview: '明天',
    },
  ];

  return (
    <div className="min-h-screen gradient-bg pb-20 md:pb-8">
      {/* 头部 */}
      <header className="bg-white shadow-sm">
        <div className="container-custom py-4">
          <h1 className="text-xl font-bold text-gray-900">复习</h1>
        </div>
      </header>

      <main className="container-custom py-6">
        {/* 复习概览 */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-6 text-white mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">今日待复习</h2>
              <p className="opacity-90">根据遗忘曲线，安排的最佳复习时间</p>
            </div>
            <div className="text-5xl font-bold">{reviewWords.length}</div>
          </div>
        </div>

        {/* 复习词列表 */}
        <div className="bg-white rounded-3xl p-6 shadow-md mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">待复习单词</h3>
          <div className="space-y-3">
            {reviewWords.map((word) => (
              <Link
                key={word.id}
                to={`/learn?review=${word.id}`}
                className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{word.word}</h4>
                    <p className="text-sm text-gray-500">{word.meaning}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
                      {word.mastery === 'NEW' ? '新词' : '学习中'}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">{word.nextReview}复习</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 开始复习按钮 */}
        {reviewWords.length > 0 && (
          <Link to="/learn?mode=review" className="btn-primary w-full text-center block">
            开始复习 ({reviewWords.length} 词)
          </Link>
        )}

        {/* 复习说明 */}
        <div className="bg-white rounded-3xl p-6 shadow-md mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">复习小贴士</h3>
          <div className="space-y-3 text-gray-600">
            <div className="flex gap-3">
              <span className="text-2xl">💡</span>
              <p>根据艾宾浩斯遗忘曲线，在遗忘前复习可以显著提升记忆效果</p>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">📖</span>
              <p>复习时先尝试回忆，再查看答案效果更好</p>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">⏱️</span>
              <p>每天复习10-20分钟比一次性大量复习更有效</p>
            </div>
          </div>
        </div>
      </main>

      {/* 底部导航 */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3">
        <Link to="/" className="flex flex-col items-center text-gray-400">
          <span className="text-2xl">🏠</span>
          <span className="text-xs mt-1">首页</span>
        </Link>
        <Link to="/learn" className="flex flex-col items-center text-gray-400">
          <span className="text-2xl">📚</span>
          <span className="text-xs mt-1">学习</span>
        </Link>
        <Link to="/review" className="flex flex-col items-center text-primary-500">
          <span className="text-2xl">🔄</span>
          <span className="text-xs mt-1">复习</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center text-gray-400">
          <span className="text-2xl">👤</span>
          <span className="text-xs mt-1">我的</span>
        </Link>
      </nav>
    </div>
  );
};

export default Review;
