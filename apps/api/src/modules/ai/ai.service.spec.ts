import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AiService } from './ai.service';

jest.mock('axios', () => ({
  post: jest.fn(),
}));

import axios from 'axios';

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AiService', () => {
  let aiService: AiService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('https://openrouter.ai/api/v1'),
          },
        },
      ],
    }).compile();

    aiService = module.get<AiService>(AiService);
  });

  describe('generateMemory', () => {
    it('should generate memory for a word', async () => {
      (mockedAxios.post as jest.Mock).mockResolvedValue({
        data: {
          choices: [
            {
              message: {
                content: '记忆口诀：test 测试，像考试一样记住！',
              },
            },
          ],
        },
      });

      const result = await aiService.generateMemory('test', '测试');

      expect(result).toBe('记忆口诀：test 测试，像考试一样记住！');
      expect(mockedAxios.post).toHaveBeenCalled();
    });

    it('should return fallback message on API error', async () => {
      (mockedAxios.post as jest.Mock).mockRejectedValue(new Error('Network error'));

      const result = await aiService.generateMemory('test', '测试');

      expect(result).toBe('AI生成暂时不可用，请稍后再试');
    });

    it('should return empty string when no content in response', async () => {
      (mockedAxios.post as jest.Mock).mockResolvedValue({
        data: {
          choices: [{}],
        },
      });

      const result = await aiService.generateMemory('test', '测试');

      expect(result).toBe('');
    });
  });

  describe('generateExamples', () => {
    it('should generate examples for a word', async () => {
      (mockedAxios.post as jest.Mock).mockResolvedValue({
        data: {
          choices: [
            {
              message: {
                content: '1. This is a test.\n2. Test the water.\n3. Take a test.',
              },
            },
          ],
        },
      });

      const result = await aiService.generateExamples('test', '测试');

      expect(result).toHaveLength(3);
      expect(result[0]).toBe('1. This is a test.');
    });

    it('should filter empty lines', async () => {
      (mockedAxios.post as jest.Mock).mockResolvedValue({
        data: {
          choices: [
            {
              message: {
                content: '1. Example 1\n\n2. Example 2\n   \n3. Example 3',
              },
            },
          ],
        },
      });

      const result = await aiService.generateExamples('test', '测试');

      expect(result.every((s) => s.trim().length > 0)).toBe(true);
    });
  });
});
