import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Eye, EyeOff } from 'lucide-react';
import { useUserStore } from '../stores/userStore';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { login, register, isLoading } = useUserStore();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.email, formData.password, formData.name);
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message || '操作失败，请重试');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-4">
            <Star className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">AI词汇大师</h1>
          <p className="text-gray-600 mt-2">智能记忆，让每个单词过目不忘</p>
        </div>

        {/* 表单卡片 */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {isLogin ? '欢迎回来' : '创建账号'}
          </h2>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  昵称
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="请输入昵称"
                  className="input-field"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                邮箱
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="请输入邮箱"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                密码
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="请输入密码"
                  className="input-field pr-12"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm text-primary-500 hover:underline">
                  忘记密码？
                </Link>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '处理中...' : (isLogin ? '登录' : '注册')}
            </button>
          </form>

          {/* 分隔线 */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">或</span>
            </div>
          </div>

          {/* 微信登录 */}
          <button className="w-full py-3 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
            <span className="text-xl">💬</span>
            微信登录
          </button>

          {/* 切换登录/注册 */}
          <p className="mt-6 text-center text-gray-600">
            {isLogin ? '还没有账号？' : '已有账号？'}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-primary-500 font-semibold hover:underline ml-1"
            >
              {isLogin ? '立即注册' : '立即登录'}
            </button>
          </p>
        </div>

        {/* 返回首页 */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-gray-500 hover:text-primary-500 transition-colors">
            ← 返回首页
          </Link>
        </div>

        {/* 底部协议 */}
        <p className="mt-4 text-center text-xs text-gray-400">
          登录即表示同意
          <a href="/terms" className="text-primary-500 hover:underline">《用户协议》</a>
          和
          <a href="/privacy" className="text-primary-500 hover:underline">《隐私政策》</a>
        </p>
      </div>
    </div>
  );
};

export default Auth;
