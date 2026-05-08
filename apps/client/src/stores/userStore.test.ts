import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useUserStore } from './userStore';

vi.mock('../services/api', () => ({
  api: {
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    getProfile: vi.fn(),
  },
}));

import { api } from '../services/api';

describe('useUserStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const { result } = renderHook(() => useUserStore());
    act(() => {
      result.current.logout();
    });
  });

  it('should have initial state', () => {
    const { result } = renderHook(() => useUserStore());
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('should login successfully', async () => {
    const mockUser = {
      id: 'user-123',
      email: 'test@example.com',
      name: 'Test User',
      dailyGoal: 20,
      streak: 5,
      wordsLearned: 100,
    };

    (api.login as any).mockResolvedValue({ user: mockUser });

    const { result } = renderHook(() => useUserStore());

    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it('should set loading state during login', async () => {
    (api.login as any).mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)));

    const { result } = renderHook(() => useUserStore());

    act(() => {
      result.current.login('test@example.com', 'password123');
    });

    expect(result.current.isLoading).toBe(true);
  });

  it('should throw error on login failure', async () => {
    const error = new Error('登录失败');
    (api.login as any).mockRejectedValue(error);

    const { result } = renderHook(() => useUserStore());

    await act(async () => {
      try {
        await result.current.login('test@example.com', 'wrongpassword');
      } catch (e) {
        expect(e).toBe(error);
      }
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('should register successfully', async () => {
    const mockUser = {
      id: 'user-123',
      email: 'new@example.com',
      name: 'New User',
      dailyGoal: 20,
      streak: 0,
      wordsLearned: 0,
    };

    (api.register as any).mockResolvedValue({ user: mockUser });

    const { result } = renderHook(() => useUserStore());

    await act(async () => {
      await result.current.register('new@example.com', 'password123', 'New User');
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('should logout successfully', async () => {
    const mockUser = {
      id: 'user-123',
      email: 'test@example.com',
      name: 'Test User',
      dailyGoal: 20,
      streak: 5,
      wordsLearned: 100,
    };

    (api.login as any).mockResolvedValue({ user: mockUser });

    const { result } = renderHook(() => useUserStore());

    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });

    expect(result.current.isAuthenticated).toBe(true);

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(api.logout).toHaveBeenCalled();
  });

  it('should fetch profile', async () => {
    const mockUser = {
      id: 'user-123',
      email: 'test@example.com',
      name: 'Test User',
      dailyGoal: 20,
      streak: 5,
      wordsLearned: 100,
    };

    (api.getProfile as any).mockResolvedValue(mockUser);

    const { result } = renderHook(() => useUserStore());

    await act(async () => {
      await result.current.fetchProfile();
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('should not update profile when user is null', () => {
    const { result } = renderHook(() => useUserStore());

    act(() => {
      result.current.updateProfile({ name: 'Updated Name' });
    });

    expect(result.current.user).toBeNull();
  });
});
