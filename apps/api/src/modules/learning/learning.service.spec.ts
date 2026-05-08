import { Test, TestingModule } from '@nestjs/testing';
import { LearningService } from './learning.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('LearningService', () => {
  let learningService: LearningService;
  let prismaService: any;

  const mockUser = {
    id: 'user-123',
    email: 'test@example.com',
    passwordHash: 'hash',
    name: 'Test User',
    avatar: null,
    dailyGoal: 20,
    streak: 5,
    wordsLearned: 100,
    createdAt: new Date(),
    lastActive: new Date(),
  };

  const mockUserWord = {
    id: 'user-word-123',
    userId: 'user-123',
    wordId: 'word-123',
    wordBookId: null,
    masteryLevel: 'NEW' as const,
    nextReview: null,
    reviewCount: 0,
    easeFactor: 2.5,
    addedAt: new Date(),
  };

  const mockWord = {
    id: 'word-123',
    word: 'test',
    phonetic: '/test/',
    meaning: '测试',
    partOfSpeech: 'verb',
    examples: ['This is a test.'],
    aiMemory: null,
    aiImageUrl: null,
    masteryLevel: 'NEW' as const,
    nextReview: null,
    reviewCount: 0,
    easeFactor: 2.5,
    createdAt: new Date(),
  };

  beforeEach(async () => {
    const mockPrismaService = {
      user: {
        findUnique: jest.fn(),
        update: jest.fn(),
      },
      userWord: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      learningRecord: {
        create: jest.fn(),
        count: jest.fn(),
      },
      $transaction: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LearningService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    learningService = module.get<LearningService>(LearningService);
    prismaService = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getTodayTask', () => {
    it('should return today learning task', async () => {
      prismaService.user.findUnique.mockResolvedValue(mockUser);
      prismaService.userWord.findMany
        .mockResolvedValueOnce([{ ...mockUserWord, word: mockWord }])
        .mockResolvedValueOnce([]);

      const result = await learningService.getTodayTask('user-123');

      expect(result.success).toBe(true);
      expect(result.data.totalToday).toBe(1);
    });

    it('should use default daily goal when not set', async () => {
      prismaService.user.findUnique.mockResolvedValue(null);
      prismaService.userWord.findMany
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([]);

      await learningService.getTodayTask('user-123');

      expect(prismaService.userWord.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          take: 20,
        }),
      );
    });
  });

  describe('getReviewQueue', () => {
    it('should return words due for review', async () => {
      const reviewWord = {
        ...mockUserWord,
        masteryLevel: 'LEARNING' as const,
        nextReview: new Date(Date.now() - 86400000),
        word: mockWord,
      };
      prismaService.userWord.findMany.mockResolvedValue([reviewWord]);

      const result = await learningService.getReviewQueue('user-123');

      expect(result).toHaveLength(1);
      expect(prismaService.userWord.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            userId: 'user-123',
            masteryLevel: { not: 'NEW' },
          }),
        }),
      );
    });
  });

  describe('submitLearning', () => {
    it('should process KNOWN status correctly', async () => {
      prismaService.userWord.findUnique.mockResolvedValue(mockUserWord);
      prismaService.$transaction.mockResolvedValue([{}, {}, {}]);

      const result = await learningService.submitLearning(
        'user-123',
        'word-123',
        'KNOWN',
        3000,
      );

      expect(result.success).toBe(true);
      expect(result.data.masteryLevel).toBe('MASTERED');
    });

    it('should process FUZZY status correctly', async () => {
      const fuzzyWord = { ...mockUserWord, masteryLevel: 'LEARNING' as const };
      prismaService.userWord.findUnique.mockResolvedValue(fuzzyWord);
      prismaService.$transaction.mockResolvedValue([{}, {}, {}]);

      const result = await learningService.submitLearning(
        'user-123',
        'word-123',
        'FUZZY',
        5000,
      );

      expect(result.success).toBe(true);
      expect(result.data.masteryLevel).toBe('LEARNING');
    });

    it('should process UNKNOWN status correctly', async () => {
      const unknownWord = { ...mockUserWord, masteryLevel: 'MASTERED' as const };
      prismaService.userWord.findUnique.mockResolvedValue(unknownWord);
      prismaService.$transaction.mockResolvedValue([{}, {}, {}]);

      const result = await learningService.submitLearning(
        'user-123',
        'word-123',
        'UNKNOWN',
        1000,
      );

      expect(result.success).toBe(true);
      expect(result.data.masteryLevel).toBe('LEARNING');
    });

    it('should create new userWord if not exists', async () => {
      prismaService.userWord.findUnique.mockResolvedValue(null);
      prismaService.userWord.create.mockResolvedValue(mockUserWord);
      prismaService.$transaction.mockResolvedValue([{}, {}, {}]);

      const result = await learningService.submitLearning(
        'user-123',
        'word-123',
        'KNOWN',
        2000,
      );

      expect(prismaService.userWord.create).toHaveBeenCalled();
      expect(result.success).toBe(true);
    });
  });

  describe('getStats', () => {
    it('should return user statistics', async () => {
      prismaService.user.findUnique.mockResolvedValue(mockUser);
      prismaService.learningRecord.count.mockResolvedValue(10);

      const result = await learningService.getStats('user-123');

      expect(result.success).toBe(true);
      expect(result.data.streak).toBe(5);
      expect(result.data.wordsLearned).toBe(100);
      expect(result.data.todayLearned).toBe(10);
    });

    it('should return default values when user not found', async () => {
      prismaService.user.findUnique.mockResolvedValue(null);
      prismaService.learningRecord.count.mockResolvedValue(0);

      const result = await learningService.getStats('nonexistent-user');

      expect(result.data.streak).toBe(0);
      expect(result.data.wordsLearned).toBe(0);
      expect(result.data.todayLearned).toBe(0);
    });
  });

  describe('calculateNextReview', () => {
    it('should calculate next review for quality < 3', () => {
      const result = (learningService as any).calculateNextReview(2.5, 5, 1);

      expect(result.nextReview).toBeInstanceOf(Date);
      expect(result.nextReview.getTime()).toBeGreaterThan(Date.now());
    });

    it('should calculate next review for first review', () => {
      const result = (learningService as any).calculateNextReview(2.5, 0, 5);

      expect(result.nextReview).toBeInstanceOf(Date);
    });

    it('should calculate next review for second review', () => {
      const result = (learningService as any).calculateNextReview(2.5, 1, 4);

      expect(result.nextReview).toBeInstanceOf(Date);
    });

    it('should adjust ease factor based on quality', () => {
      const result1 = (learningService as any).calculateNextReview(2.5, 2, 5);
      const result2 = (learningService as any).calculateNextReview(2.5, 2, 3);

      expect(result1.newEaseFactor).toBeGreaterThan(result2.newEaseFactor);
    });
  });
});
