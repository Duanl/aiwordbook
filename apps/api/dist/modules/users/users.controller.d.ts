import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<{
        success: boolean;
        data: {
            name: string;
            email: string;
            id: string;
            avatar: string | null;
            dailyGoal: number;
            streak: number;
            wordsLearned: number;
            createdAt: Date;
            lastActive: Date;
        } | null;
    }>;
    updateProfile(req: any, data: {
        name?: string;
        avatar?: string;
        dailyGoal?: number;
    }): Promise<{
        success: boolean;
        data: {
            name: string;
            email: string;
            id: string;
            avatar: string | null;
            dailyGoal: number;
        };
    }>;
}
