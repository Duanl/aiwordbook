import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class WordsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
  ) {}

  async getWords(query: { category?: string; page?: number; limit?: number }) {
    const { category, page = 1, limit = 20 } = query;
    
    const where: Prisma.WordWhereInput = {};
    if (category) {
      where.userWords = {
        some: {
          wordBook: {
            category: category
          }
        }
      };
    }

    const [words, total] = await Promise.all([
      this.prisma.word.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.word.count({ where }),
    ]);

    return {
      success: true,
      data: words,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getWord(id: string) {
    const word = await this.prisma.word.findUnique({
      where: { id },
    });

    if (!word) {
      throw new Error('Word not found');
    }

    return { success: true, data: word };
  }

  async generateAI(word: string, meaning: string) {
    const [memory, examples] = await Promise.all([
      this.aiService.generateMemory(word, meaning),
      this.aiService.generateExamples(word, meaning),
    ]);

    return {
      success: true,
      data: { memory, examples },
    };
  }
}
