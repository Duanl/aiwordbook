"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let LearningService = class LearningService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getTodayTask(userId) {
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
    async getReviewQueue(userId) {
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
    async submitLearning(userId, wordId, status, responseTime) {
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
    async processLearningResult(userWord, status, responseTime) {
        const quality = status === 'KNOWN' ? 5 : status === 'FUZZY' ? 3 : 1;
        const { nextReview, newEaseFactor } = this.calculateNextReview(userWord.easeFactor, userWord.reviewCount, quality);
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
    calculateNextReview(easeFactor, reviewCount, quality) {
        let interval;
        let newEaseFactor = easeFactor;
        if (quality < 3) {
            interval = 1;
        }
        else {
            if (reviewCount === 0)
                interval = 1;
            else if (reviewCount === 1)
                interval = 6;
            else
                interval = Math.round(reviewCount * easeFactor);
            newEaseFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
        }
        const nextReview = new Date(Date.now() + interval * 24 * 60 * 60 * 1000);
        return { nextReview, newEaseFactor };
    }
    async getStats(userId) {
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
};
exports.LearningService = LearningService;
exports.LearningService = LearningService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LearningService);
//# sourceMappingURL=learning.service.js.map