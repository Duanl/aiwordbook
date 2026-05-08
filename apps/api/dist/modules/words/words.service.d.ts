import { PrismaService } from '../../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
export declare class WordsService {
    private readonly prisma;
    private readonly aiService;
    constructor(prisma: PrismaService, aiService: AiService);
    getWords(query: {
        category?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        success: boolean;
        data: {
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
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getWord(id: string): Promise<{
        success: boolean;
        data: {
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
    }>;
    generateAI(word: string, meaning: string): Promise<{
        success: boolean;
        data: {
            memory: string;
            examples: string[];
        };
    }>;
}
