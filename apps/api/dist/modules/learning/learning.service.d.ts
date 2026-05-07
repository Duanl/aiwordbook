import { PrismaService } from '../../prisma/prisma.service';
export declare class LearningService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getTodayTask(userId: string): Promise<{
        success: boolean;
        data: {
            newWords: ({
                word: {
                    word: string;
                    examples: string[];
                    id: string;
                    createdAt: Date;
                    phonetic: string;
                    meaning: string;
                    partOfSpeech: string;
                    aiMemory: string | null;
                    aiImageUrl: string | null;
                    masteryLevel: import(".prisma/client").$Enums.MasteryLevel;
                    nextReview: Date | null;
                    reviewCount: number;
                    easeFactor: number;
                };
            } & {
                id: string;
                userId: string;
                masteryLevel: import(".prisma/client").$Enums.MasteryLevel;
                nextReview: Date | null;
                reviewCount: number;
                easeFactor: number;
                wordId: string;
                wordBookId: string | null;
                addedAt: Date;
            })[];
            reviewWords: ({
                word: {
                    word: string;
                    examples: string[];
                    id: string;
                    createdAt: Date;
                    phonetic: string;
                    meaning: string;
                    partOfSpeech: string;
                    aiMemory: string | null;
                    aiImageUrl: string | null;
                    masteryLevel: import(".prisma/client").$Enums.MasteryLevel;
                    nextReview: Date | null;
                    reviewCount: number;
                    easeFactor: number;
                };
            } & {
                id: string;
                userId: string;
                masteryLevel: import(".prisma/client").$Enums.MasteryLevel;
                nextReview: Date | null;
                reviewCount: number;
                easeFactor: number;
                wordId: string;
                wordBookId: string | null;
                addedAt: Date;
            })[];
            totalToday: number;
        };
    }>;
    getReviewQueue(userId: string): Promise<({
        word: {
            word: string;
            examples: string[];
            id: string;
            createdAt: Date;
            phonetic: string;
            meaning: string;
            partOfSpeech: string;
            aiMemory: string | null;
            aiImageUrl: string | null;
            masteryLevel: import(".prisma/client").$Enums.MasteryLevel;
            nextReview: Date | null;
            reviewCount: number;
            easeFactor: number;
        };
    } & {
        id: string;
        userId: string;
        masteryLevel: import(".prisma/client").$Enums.MasteryLevel;
        nextReview: Date | null;
        reviewCount: number;
        easeFactor: number;
        wordId: string;
        wordBookId: string | null;
        addedAt: Date;
    })[]>;
    submitLearning(userId: string, wordId: string, status: 'KNOWN' | 'FUZZY' | 'UNKNOWN', responseTime: number): Promise<{
        success: boolean;
        data: {
            wordId: any;
            nextReview: Date;
            masteryLevel: string;
        };
    }>;
    private processLearningResult;
    private calculateNextReview;
    getStats(userId: string): Promise<{
        success: boolean;
        data: {
            streak: number;
            wordsLearned: number;
            todayLearned: number;
        };
    }>;
}
