import { PrismaService } from '../../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
        name: string;
        email: string;
        id: string;
        avatar: string | null;
        dailyGoal: number;
        streak: number;
        wordsLearned: number;
        createdAt: Date;
        lastActive: Date;
    } | null>;
    findByEmail(email: string): Promise<{
        name: string;
        email: string;
        id: string;
        passwordHash: string;
        avatar: string | null;
        dailyGoal: number;
        streak: number;
        wordsLearned: number;
        createdAt: Date;
        lastActive: Date;
    } | null>;
    updateProfile(id: string, data: {
        name?: string;
        avatar?: string;
        dailyGoal?: number;
    }): Promise<{
        name: string;
        email: string;
        id: string;
        avatar: string | null;
        dailyGoal: number;
    }>;
}
