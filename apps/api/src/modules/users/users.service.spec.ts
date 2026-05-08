import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let prismaService: any;

  const mockUser = {
    id: 'user-123',
    email: 'test@example.com',
    name: 'Test User',
    avatar: null,
    dailyGoal: 20,
    streak: 5,
    wordsLearned: 100,
    createdAt: new Date(),
    lastActive: new Date(),
  };

  beforeEach(async () => {
    const mockPrismaService = {
      user: {
        findUnique: jest.fn(),
        update: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    prismaService = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findById', () => {
    it('should return user when found', async () => {
      prismaService.user.findUnique.mockResolvedValue(mockUser);

      const result = await usersService.findById('user-123');

      expect(result).toBeDefined();
      expect(result!.id).toBe('user-123');
      expect(result!.email).toBe('test@example.com');
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'user-123' },
        select: {
          id: true,
          email: true,
          name: true,
          avatar: true,
          dailyGoal: true,
          streak: true,
          wordsLearned: true,
          createdAt: true,
          lastActive: true,
        },
      });
    });

    it('should return null when user not found', async () => {
      prismaService.user.findUnique.mockResolvedValue(null);

      const result = await usersService.findById('nonexistent-id');

      expect(result).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should return user when found', async () => {
      prismaService.user.findUnique.mockResolvedValue(mockUser);

      const result = await usersService.findByEmail('test@example.com');

      expect(result).toBeDefined();
      expect(result!.email).toBe('test@example.com');
    });

    it('should return null when user not found', async () => {
      prismaService.user.findUnique.mockResolvedValue(null);

      const result = await usersService.findByEmail('nonexistent@example.com');

      expect(result).toBeNull();
    });
  });

  describe('updateProfile', () => {
    it('should update user profile successfully', async () => {
      const updatedUser = { ...mockUser, name: 'Updated Name' };
      prismaService.user.update.mockResolvedValue(updatedUser);

      const result = await usersService.updateProfile('user-123', {
        name: 'Updated Name',
      });

      expect(result.name).toBe('Updated Name');
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id: 'user-123' },
        data: { name: 'Updated Name' },
        select: {
          id: true,
          email: true,
          name: true,
          avatar: true,
          dailyGoal: true,
        },
      });
    });

    it('should update daily goal', async () => {
      const updatedUser = { ...mockUser, dailyGoal: 30 };
      prismaService.user.update.mockResolvedValue(updatedUser);

      const result = await usersService.updateProfile('user-123', {
        dailyGoal: 30,
      });

      expect(result.dailyGoal).toBe(30);
    });

    it('should update avatar', async () => {
      const updatedUser = { ...mockUser, avatar: 'https://example.com/avatar.jpg' };
      prismaService.user.update.mockResolvedValue(updatedUser);

      const result = await usersService.updateProfile('user-123', {
        avatar: 'https://example.com/avatar.jpg',
      });

      expect(result.avatar).toBe('https://example.com/avatar.jpg');
    });
  });
});
