import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: any;
  let jwtService: any;

  const mockUser = {
    id: 'user-123',
    email: 'test@example.com',
    passwordHash: '$2b$10$abcdefghijklmnopqrstuv',
    name: 'Test User',
    avatar: null,
    dailyGoal: 20,
    streak: 0,
    wordsLearned: 0,
    createdAt: new Date(),
    lastActive: new Date(),
  };

  beforeEach(async () => {
    const mockPrismaService = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    };

    const mockJwtService = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prismaService = module.get(PrismaService);
    jwtService = module.get(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      prismaService.user.findUnique.mockResolvedValue(null);
      prismaService.user.create.mockResolvedValue(mockUser);
      jwtService.sign.mockReturnValue('mock-token');

      const result = await authService.register({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      });

      expect(result.success).toBe(true);
      expect(result.data.token).toBe('mock-token');
      expect(result.data.user.email).toBe('test@example.com');
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(prismaService.user.create).toHaveBeenCalled();
    });

    it('should throw UnauthorizedException if email already exists', async () => {
      prismaService.user.findUnique.mockResolvedValue(mockUser);

      await expect(
        authService.register({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('validateUser', () => {
    it('should return user if credentials are valid', async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const userWithHash = { ...mockUser, passwordHash: hashedPassword };
      prismaService.user.findUnique.mockResolvedValue(userWithHash);

      const result = await authService.validateUser('test@example.com', 'password123');

      expect(result).toBeDefined();
      expect(result.email).toBe('test@example.com');
      expect(result.passwordHash).toBeUndefined();
    });

    it('should return null if user not found', async () => {
      prismaService.user.findUnique.mockResolvedValue(null);

      const result = await authService.validateUser('nonexistent@example.com', 'password123');

      expect(result).toBeNull();
    });

    it('should return null if password is incorrect', async () => {
      const hashedPassword = await bcrypt.hash('correctpassword', 10);
      const userWithHash = { ...mockUser, passwordHash: hashedPassword };
      prismaService.user.findUnique.mockResolvedValue(userWithHash);

      const result = await authService.validateUser('test@example.com', 'wrongpassword');

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      jwtService.sign.mockReturnValue('mock-token');

      const result = await authService.login(mockUser);

      expect(result.success).toBe(true);
      expect(result.data.token).toBe('mock-token');
      expect(result.data.user.email).toBe('test@example.com');
      expect(jwtService.sign).toHaveBeenCalledWith({ id: mockUser.id });
    });
  });

  describe('getProfile', () => {
    it('should return user profile', async () => {
      prismaService.user.findUnique.mockResolvedValue(mockUser);

      const result = await authService.getProfile('user-123');

      expect(result.success).toBe(true);
      expect(result.data.email).toBe('test@example.com');
    });

    it('should throw UnauthorizedException if user not found', async () => {
      prismaService.user.findUnique.mockResolvedValue(null);

      await expect(authService.getProfile('nonexistent-id')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
