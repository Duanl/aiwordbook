import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LearningService {
  constructor(private readonly prisma: PrismaService) {}

  async getTodayTask(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { dailyGoal: true },
    });

    const newWords = await this.prisma.userWord.findMany({
      where: {
        userId,
        masteryLevel: 'NEW',
      },
      take: user?.dailyGoal || 20,
      include: {
        word: true,
      },
      orderBy: {
        addedAt: 'asc',
      },
    });

    const reviewWords = await this.getReviewQueue(userId);

    return {
      success: true,
      data: {
        newWords,
        reviewWords,
        totalToday: newWords.length + reviewWords.length,
      },
    };
  }

  async getReviewQueue(userId: string) {
    const now = new Date();
    return this.prisma.userWord.findMany({
      where: {
        userId,
        masteryLevel: { not: 'NEW' },
        nextReview: { lte: now },
      },
      include: {
        word: true,
      },
      orderBy: {
        nextReview: 'asc',
      },
    });
  }

  async submitLearning(
    userId: string,
    wordId: string,
    status: 'KNOWN' | 'FUZZY' | 'UNKNOWN',
    responseTime: number,
  ) {
    const userWord = await this.prisma.userWord.findUnique({
      where: { userId_wordId: { userId, wordId } },
    });

    if (!userWord) {
      const newWord = await this.prisma.userWord.create({
        data: {
          userId,
          wordId,
          masteryLevel: 'LEARNING',
        },
      });
      return this.processLearningResult(newWord, status, responseTime);
    }

    return this.processLearningResult(userWord, status, responseTime);
  }

  private async processLearningResult(
    userWord: any,
    status: 'KNOWN' | 'FUZZY' | 'UNKNOWN',
    responseTime: number,
  ) {
    const quality = status === 'KNOWN' ? 5 : status === 'FUZZY' ? 3 : 1;
    const { nextReview, newEaseFactor } = this.calculateNextReview(
      userWord.easeFactor,
      userWord.reviewCount,
      quality,
    );

    const masteryLevel = quality >= 4 ? 'MASTERED' : 'LEARNING';

    await this.prisma.$transaction([
      this.prisma.userWord.update({
        where: { id: userWord.id },
        data: {
          nextReview,
          easeFactor: newEaseFactor,
          reviewCount: { increment: 1 },
          masteryLevel,
        },
      }),
      this.prisma.learningRecord.create({
        data: {
          userId: userWord.userId,
          wordId: userWord.wordId,
          status,
          responseTime,
        },
      }),
      this.prisma.user.update({
        where: { id: userWord.userId },
        data: {
          wordsLearned: { increment: status === 'KNOWN' ? 1 : 0 },
          lastActive: new Date(),
        },
      }),
    ]);

    return {
      success: true,
      data: {
        wordId: userWord.wordId,
        nextReview,
        masteryLevel,
      },
    };
  }

  private calculateNextReview(
    easeFactor: number,
    reviewCount: number,
    quality: number,
  ): { nextReview: Date; newEaseFactor: number } {
    let interval: number;
    let newEaseFactor = easeFactor;

    if (quality < 3) {
      interval = 1;
    } else {
      if (reviewCount === 0) interval = 1;
      else if (reviewCount === 1) interval = 6;
      else interval = Math.round(reviewCount * easeFactor);

      newEaseFactor = Math.max(
        1.3,
        easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)),
      );
    }

    const nextReview = new Date(Date.now() + interval * 24 * 60 * 60 * 1000);

    return { nextReview, newEaseFactor };
  }

  async getStats(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        streak: true,
        wordsLearned: true,
        lastActive: true,
      },
    });

    const todayRecords = await this.prisma.learningRecord.count({
      where: {
        userId,
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    });

    return {
      success: true,
      data: {
        streak: user?.streak || 0,
        wordsLearned: user?.wordsLearned || 0,
        todayLearned: todayRecords,
      },
    };
  }
}
