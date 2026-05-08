import { Test, TestingModule } from '@nestjs/testing';
import { WordsService } from './words.service';
import { PrismaService } from '../../prisma/prisma.service';
import { AiService } from '../ai/ai.service';

describe('WordsService', () => {
  let wordsService: WordsService;
  let prismaService: any;
  let aiService: any;

  const mockWord = {
    id: 'word-123',
    word: 'test',
    phonetic: '/test/',
    meaning: '测试',
    partOfSpeech: 'verb',
    examples: ['This is a test.', 'Test the system.'],
    aiMemory: null,
    aiImageUrl: null,
    masteryLevel: 'NEW',
    nextReview: null,
    reviewCount: 0,
    easeFactor: 2.5,
    createdAt: new Date(),
  };

  beforeEach(async () => {
    const mockPrismaService = {
      word: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        count: jest.fn(),
      },
    };

    const mockAiService = {
      generateMemory: jest.fn(),
      generateExamples: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WordsService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: AiService, useValue: mockAiService },
      ],
    }).compile();

    wordsService = module.get<WordsService>(WordsService);
    prismaService = module.get(PrismaService);
    aiService = module.get(AiService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getWords', () => {
    it('should return paginated words', async () => {
      const mockWords = [mockWord];
      prismaService.word.findMany.mockResolvedValue(mockWords);
      prismaService.word.count.mockResolvedValue(1);

      const result = await wordsService.getWords({ page: 1, limit: 20 });

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.meta.total).toBe(1);
      expect(result.meta.page).toBe(1);
    });

    it('should return words with pagination metadata', async () => {
      const mockWords = [mockWord];
      prismaService.word.findMany.mockResolvedValue(mockWords);
      prismaService.word.count.mockResolvedValue(50);

      const result = await wordsService.getWords({ page: 2, limit: 10 });

      expect(result.meta.totalPages).toBe(5);
      expect(result.meta.page).toBe(2);
      expect(prismaService.word.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 10,
          take: 10,
        }),
      );
    });

    it('should apply default pagination values', async () => {
      prismaService.word.findMany.mockResolvedValue([]);
      prismaService.word.count.mockResolvedValue(0);

      await wordsService.getWords({});

      expect(prismaService.word.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 0,
          take: 20,
        }),
      );
    });
  });

  describe('getWord', () => {
    it('should return word when found', async () => {
      prismaService.word.findUnique.mockResolvedValue(mockWord);

      const result = await wordsService.getWord('word-123');

      expect(result.success).toBe(true);
      expect(result.data.word).toBe('test');
      expect(prismaService.word.findUnique).toHaveBeenCalledWith({
        where: { id: 'word-123' },
      });
    });

    it('should throw error when word not found', async () => {
      prismaService.word.findUnique.mockResolvedValue(null);

      await expect(wordsService.getWord('nonexistent-id')).rejects.toThrow(
        'Word not found',
      );
    });
  });

  describe('generateAI', () => {
    it('should generate AI memory and examples', async () => {
      aiService.generateMemory.mockResolvedValue('记忆口诀');
      aiService.generateExamples.mockResolvedValue(['例句1', '例句2']);

      const result = await wordsService.generateAI('test', '测试');

      expect(result.success).toBe(true);
      expect(result.data.memory).toBe('记忆口诀');
      expect(result.data.examples).toEqual(['例句1', '例句2']);
    });

    it('should call AI service with correct parameters', async () => {
      aiService.generateMemory.mockResolvedValue('');
      aiService.generateExamples.mockResolvedValue([]);

      await wordsService.generateAI('apple', '苹果');

      expect(aiService.generateMemory).toHaveBeenCalledWith('apple', '苹果');
      expect(aiService.generateExamples).toHaveBeenCalledWith('apple', '苹果');
    });
  });
});
