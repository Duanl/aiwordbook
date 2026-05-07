import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Flame, Trophy, Settings, LogOut, ChevronRight, Bell } from 'lucide-react';
import { useUserStore } from '../stores/userStore';
import ProgressRing from '../components/ProgressRing';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useUserStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">请先登录</h2>
          <Link to="/auth" className="btn-primary">
            去登录
          </Link>
        </div>
      </div>
    );
  }

  const stats = [
    { icon: Flame, label: '连续学习', value: `${user?.streak || 0} 天`, color: 'text-orange-500' },
    { icon: BookOpen, label: '已学单词', value: `${user?.wordsLearned || 0} 个`, color: 'text-blue-500' },
    { icon: Trophy, label: '获得徽章', value: '8 枚', color: 'text-purple-500' },
  ];

  const achievements = [
    { title: '初次学习', desc: '完成第一次学习', unlocked: true, icon: '🌟' },
    { title: '连续7天', desc: '保持7天学习', unlocked: true, icon: '🔥' },
    { title: '学习100词', desc: '掌握100个单词', unlocked: true, icon: '📚' },
    { title: '连续30天', desc: '保持30天学习', unlocked: false, icon: '💎' },
  ];

  return (
    <div className="min-h-screen gradient-bg pb-20 md:pb-8">
      {/* 头部 */}
      <header className="bg-white shadow-sm">
        <div className="container-custom py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">我的</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      <main className="container-custom py-6">
        {/* 用户信息卡片 */}
        <div className="bg-white rounded-3xl p-6 shadow-md mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-white text-3xl font-bold">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
              <p className="text-gray-500">{user?.email}</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* 学习进度 */}
        <div className="bg-white rounded-3xl p-6 shadow-md mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">今日进度</h3>
          <div className="flex items-center gap-8">
            <ProgressRing progress={65} size={100} strokeWidth={8} />
            <div className="flex-1 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-500">{user?.dailyGoal || 20}</div>
                <div className="text-xs text-gray-500">目标</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">13</div>
                <div className="text-xs text-gray-500">已学</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">7</div>
                <div className="text-xs text-gray-500">待复习</div>
              </div>
            </div>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 shadow-md text-center">
              <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
              <div className="text-xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 成就列表 */}
        <div className="bg-white rounded-3xl p-6 shadow-md mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">我的成就</h3>
            <span className="text-sm text-gray-500">8/20 已解锁</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border-2 ${
                  achievement.unlocked
                    ? 'border-yellow-200 bg-yellow-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <h4 className={`font-semibold ${achievement.unlocked ? 'text-gray-900' : 'text-gray-400'}`}>
                  {achievement.title}
                </h4>
                <p className={`text-xs ${achievement.unlocked ? 'text-gray-500' : 'text-gray-400'}`}>
                  {achievement.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 菜单列表 */}
        <div className="bg-white rounded-3xl shadow-md overflow-hidden">
          <Link to="/wordbook" className="flex items-center justify-between p-4 border-b hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📚</span>
              <span className="font-medium text-gray-900">我的词库</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>
          <Link to="/settings" className="flex items-center justify-between p-4 border-b hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚙️</span>
              <span className="font-medium text-gray-900">学习设置</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>
          <Link to="/help" className="flex items-center justify-between p-4 border-b hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-2xl">❓</span>
              <span className="font-medium text-gray-900">帮助与反馈</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-4 text-red-500 hover:bg-red-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">退出登录</span>
            </div>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* 版本信息 */}
        <div className="mt-6 text-center text-xs text-gray-400">
          AI词汇大师 v1.0.0
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
        <Link to="/review" className="flex flex-col items-center text-gray-400">
          <span className="text-2xl">🔄</span>
          <span className="text-xs mt-1">复习</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center text-primary-500">
          <span className="text-2xl">👤</span>
          <span className="text-xs mt-1">我的</span>
        </Link>
      </nav>
    </div>
  );
};

export default Profile;
