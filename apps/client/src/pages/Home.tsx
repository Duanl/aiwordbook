import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Brain, Trophy, TrendingUp, Star, Flame } from 'lucide-react';
import { useUserStore } from '../stores/userStore';
import ProgressRing from '../components/ProgressRing';

const Home: React.FC = () => {
  const { user, isAuthenticated } = useUserStore();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('早上好');
    else if (hour < 18) setGreeting('下午好');
    else setGreeting('晚上好');
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'AI智能记忆',
      description: 'AI生成个性化记忆口诀',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: BookOpen,
      title: '科学记忆法',
      description: '间隔重复，高效抗遗忘',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Trophy,
      title: '成就系统',
      description: '解锁徽章，保持学习动力',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: TrendingUp,
      title: '进度追踪',
      description: '数据可视化，见证成长',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="min-h-screen gradient-bg">
      {/* 头部导航 */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container-custom py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AI词汇大师</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-primary-500 font-medium">首页</Link>
            <Link to="/learn" className="text-gray-600 hover:text-primary-500">学习</Link>
            <Link to="/review" className="text-gray-600 hover:text-primary-500">复习</Link>
            {isAuthenticated && (
              <Link to="/profile" className="text-gray-600 hover:text-primary-500">我的</Link>
            )}
          </nav>
          <div>
            {isAuthenticated ? (
              <Link to="/learn" className="btn-primary">
                开始学习
              </Link>
            ) : (
              <Link to="/auth" className="btn-primary">
                登录/注册
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="container-custom py-12">
        {/* 欢迎区域 */}
        <section className="mb-16 animate-fade-in-up">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {greeting}，{isAuthenticated ? user?.name || '学习者' : '欢迎来到'}
                  <span className="bg-gradient-to-r from-primary-500 to-cyan-500 bg-clip-text text-transparent">
                    {' '}AI词汇大师
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  智能记忆，让每个单词过目不忘。AI赋能，让背单词变得有趣又高效。
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/learn" className="btn-primary">
                    立即开始学习
                  </Link>
                  <Link to="/features" className="btn-secondary">
                    了解更多
                  </Link>
                </div>
              </div>
              <div className="relative">
                <ProgressRing progress={65} size={200} strokeWidth={12} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-primary-500">65%</span>
                  <span className="text-sm text-gray-500">今日进度</span>
                </div>
              </div>
            </div>

            {/* 学习统计 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-primary-500 mb-1">
                  <Flame className="w-6 h-6" />
                  <span>{isAuthenticated ? user?.streak || 0 : 0}</span>
                </div>
                <p className="text-gray-500 text-sm">连续学习天数</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-cyan-500 mb-1">
                  <BookOpen className="w-6 h-6" />
                  <span>{isAuthenticated ? user?.wordsLearned || 0 : 0}</span>
                </div>
                <p className="text-gray-500 text-sm">已掌握单词</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-purple-500 mb-1">
                  <Trophy className="w-6 h-6" />
                  <span>8</span>
                </div>
                <p className="text-gray-500 text-sm">获得徽章</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-orange-500 mb-1">
                  <TrendingUp className="w-6 h-6" />
                  <span>98%</span>
                </div>
                <p className="text-gray-500 text-sm">正确率</p>
              </div>
            </div>
          </div>
        </section>

        {/* 功能特点 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            为什么选择AI词汇大师？
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md card-hover animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA区域 */}
        <section className="mb-16">
          <div className="gradient-primary rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              准备好开始你的词汇之旅了吗？
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              加入数百万学习者的行列，让AI成为你的专属词汇教练
            </p>
            <Link
              to="/auth"
              className="inline-block bg-white text-primary-500 font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              立即免费开始
            </Link>
          </div>
        </section>

        {/* 底部导航 */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3">
          <Link to="/" className="flex flex-col items-center text-primary-500">
            <BookOpen className="w-6 h-6" />
            <span className="text-xs mt-1">首页</span>
          </Link>
          <Link to="/learn" className="flex flex-col items-center text-gray-400">
            <Brain className="w-6 h-6" />
            <span className="text-xs mt-1">学习</span>
          </Link>
          <Link to="/review" className="flex flex-col items-center text-gray-400">
            <TrendingUp className="w-6 h-6" />
            <span className="text-xs mt-1">复习</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center text-gray-400">
            <Trophy className="w-6 h-6" />
            <span className="text-xs mt-1">我的</span>
          </Link>
        </nav>
      </main>
    </div>
  );
};

export default Home;
