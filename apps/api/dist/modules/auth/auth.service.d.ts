import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/auth.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
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
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
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
    getProfile(userId: string): Promise<{
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
}
