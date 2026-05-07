import { AuthService } from './auth.service';
import { RegisterDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        success: boolean;
        data: {
            token: string;
            user: {
                id: string;
                email: string;
                name: string;
                dailyGoal: number;
                streak: number;
                wordsLearned: number;
            };
        };
    }>;
    login(req: any): Promise<{
        success: boolean;
        data: {
            token: string;
            user: {
                id: any;
                email: any;
                name: any;
                dailyGoal: any;
                streak: any;
                wordsLearned: any;
            };
        };
    }>;
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
        };
    }>;
    logout(): Promise<{
        success: boolean;
        message: string;
    }>;
}
