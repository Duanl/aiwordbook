import { LearningService } from './learning.service';
export declare class LearningController {
    private readonly learningService;
    constructor(learningService: LearningService);
    getTodayTask(req: any): Promise<{
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
    getReviewWords(req: any): Promise<{
        success: boolean;
        data: ({
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
    }>;
    submitLearning(req: any, body: {
        wordId: string;
        status: 'KNOWN' | 'FUZZY' | 'UNKNOWN';
        responseTime: number;
    }): Promise<{
        success: boolean;
        data: {
            wordId: any;
            nextReview: Date;
            masteryLevel: string;
        };
    }>;
    getStats(req: any): Promise<{
        success: boolean;
        data: {
            streak: number;
            wordsLearned: number;
            todayLearned: number;
        };
    }>;
}
