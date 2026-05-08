# AI背单词应用 - 完整技术架构文档

## 1. 系统架构设计

### 1.1 整体架构图
```mermaid
flowchart TB
    subgraph Client
        A[React SPA] --> B[Zustand Store]
        A --> C[React Router]
        A --> D[Tailwind CSS]
    end

    subgraph Backend["Backend (NestJS)"]
        E[NestJS Application] --> F[Modules]
        F --> G[Controllers]
        F --> H[Services]
        F --> I[Repositories]
        G --> J[Guards & Middlewares]
        H --> K[Prisma Service]
        H --> L[OpenRouter Service]
    end

    subgraph DataLayer
        M[PostgreSQL Database] <--> K
        N[Redis Cache] <--> H
    end

    subgraph ExternalServices
        O[OpenRouter API] <--> L
    end

    Client <-->|REST API| Backend
    Backend <-->|ORM| DataLayer
    Backend <-->|HTTP| ExternalServices
```

### 1.2 技术栈详情

| 层级 | 技术选型 | 说明 |
|------|----------|------|
| **前端** | React 18 + TypeScript | 组件化开发 |
| **构建** | Vite | 快速HMR |
| **样式** | Tailwind CSS | 原子化CSS |
| **状态** | Zustand | 轻量状态管理 |
| **路由** | React Router v6 | SPA路由 |
| **后端** | NestJS + TypeScript | 模块化企业级框架 |
| **数据库** | PostgreSQL | 关系型数据 |
| **缓存** | Redis | 会话和热点数据 |
| **ORM** | Prisma | 类型安全数据库访问 |
| **认证** | JWT + @nestjs/jwt | 无状态认证 |
| **AI服务** | OpenRouter API | 调用free模型 |
| **部署** | Docker | 容器化部署 |

## 2. 项目结构

### 2.1 Monorepo结构

```
/workspace
├── apps/
│   ├── client/                    # 前端应用
│   │   ├── src/
│   │   │   ├── main.tsx
│   │   │   ├── App.tsx
│   │   │   ├── index.css
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── stores/
│   │   │   ├── services/
│   │   │   ├── hooks/
│   │   │   ├── utils/
│   │   │   ├── types/
│   │   │   └── data/
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   └── tailwind.config.js
│   │
│   └── api/                       # 后端应用 (NestJS)
│       ├── src/
│       │   ├── main.ts
│       │   ├── app.module.ts
│       │   ├── common/             # 公共模块
│       │   │   ├── decorators/
│       │   │   ├── guards/
│       │   │   ├── interceptors/
│       │   │   ├── filters/
│       │   │   └── pipes/
│       │   ├── config/             # 配置模块
│       │   │   ├── config.module.ts
│       │   │   └── configuration.ts
│       │   ├── modules/
│       │   │   ├── auth/           # 认证模块
│       │   │   │   ├── auth.module.ts
│       │   │   │   ├── auth.controller.ts
│       │   │   │   ├── auth.service.ts
│       │   │   │   ├── strategies/
│       │   │   │   │   └── jwt.strategy.ts
│       │   │   │   ├── guards/
│       │   │   │   │   └── jwt-auth.guard.ts
│       │   │   │   └── dto/
│       │   │   ├── users/          # 用户模块
│       │   │   │   ├── users.module.ts
│       │   │   │   ├── users.service.ts
│       │   │   │   ├── users.controller.ts
│       │   │   │   └── entities/
│       │   │   ├── words/          # 单词模块
│       │   │   │   ├── words.module.ts
│       │   │   │   ├── words.controller.ts
│       │   │   │   ├── words.service.ts
│       │   │   │   └── entities/
│       │   │   ├── learning/       # 学习模块
│       │   │   │   ├── learning.module.ts
│       │   │   │   ├── learning.controller.ts
│       │   │   │   ├── learning.service.ts
│       │   │   │   └── dto/
│       │   │   ├── wordbook/       # 词库模块
│       │   │   │   ├── wordbook.module.ts
│       │   │   │   ├── wordbook.controller.ts
│       │   │   │   ├── wordbook.service.ts
│       │   │   │   └── entities/
│       │   │   └── ai/             # AI模块
│       │   │       ├── ai.module.ts
│       │   │       ├── ai.controller.ts
│       │   │       └── ai.service.ts
│       │   ├── prisma/             # Prisma
│       │   │   ├── prisma.module.ts
│       │   │   ├── prisma.service.ts
│       │   │   └── schema.prisma
│       │   └── prisma-generated/   # Prisma Client
│       ├── test/
│       ├── package.json
│       ├── tsconfig.json
│       └── nest-cli.json
│
├── docker-compose.yml
├── .env.example
├── package.json                    # Workspace配置
└── README.md
```

### 2.2 NestJS模块说明

```mermaid
classDiagram
    class AppModule {
        + configure(consumer)
    }

    class AuthModule {
        + JwtStrategy
        + AuthController
        + AuthService
    }

    class UsersModule {
        + UsersController
        + UsersService
    }

    class WordsModule {
        + WordsController
        + WordsService
    }

    class LearningModule {
        + LearningController
        + LearningService
    }

    class WordbookModule {
        + WordbookController
        + WordbookService
    }

    class AIModule {
        + AIController
        + AIService
    }

    AppModule --> AuthModule
    AppModule --> UsersModule
    AppModule --> WordsModule
    AppModule --> LearningModule
    AppModule --> WordbookModule
    AppModule --> AIModule
```

## 3. 数据库设计

### 3.1 ER图
```mermaid
erDiagram
    USER ||--o{ WORD : learns
    USER ||--o{ LEARNING_RECORD : has
    USER ||--o{ WORD_BOOK : owns
    WORD ||--o{ LEARNING_RECORD : has
    WORD_BOOK ||--o{ WORD : contains

    USER {
        uuid id PK
        string email UK
        string password_hash
        string name
        int daily_goal
        int streak
        timestamp created_at
        timestamp last_active
    }

    WORD_BOOK {
        uuid id PK
        uuid user_id FK
        string name
        string category
        timestamp created_at
    }

    WORD {
        uuid id PK
        string word
        string phonetic
        string meaning
        string part_of_speech
        string[] examples
        string ai_memory
        string ai_image_url
        enum mastery_level
        timestamp next_review
        int review_count
        float ease_factor
    }

    LEARNING_RECORD {
        uuid id PK
        uuid user_id FK
        uuid word_id FK
        enum status
        int response_time
        timestamp created_at
    }
}
```

### 3.2 Prisma Schema

```typescript
// apps/api/src/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
  output   = "../prisma-generated"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           String   @id @default(uuid())
  email        String   @unique
  passwordHash String   @map("password_hash")
  name         String
  dailyGoal    Int      @default(20) @map("daily_goal")
  streak       Int      @default(0) @map("streak")
  wordsLearned Int      @default(0) @map("words_learned")
  createdAt    DateTime @default(now()) @map("created_at")
  lastActive   DateTime @default(now()) @map("last_active")

  wordBooks      WordBook[]
  learningRecords LearningRecord[]
  userWords      UserWord[]

  @@map("users")
}

model WordBook {
  id        String   @id @default(uuid())
  userId    String   @map("user_id")
  name      String
  category  String
  createdAt DateTime @default(now()) @map("created_at")

  user  User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  words UserWord[]

  @@map("word_books")
}

model Word {
  id           String       @id @default(uuid())
  word         String       @unique
  phonetic     String
  meaning      String
  partOfSpeech String       @map("part_of_speech")
  examples     String[]
  aiMemory     String?      @map("ai_memory")
  aiImageUrl   String?      @map("ai_image_url")
  masteryLevel MasteryLevel @default(NEW) @map("mastery_level")
  nextReview   DateTime?    @map("next_review")
  reviewCount  Int          @default(0) @map("review_count")
  easeFactor   Float        @default(2.5) @map("ease_factor")
  createdAt    DateTime     @default(now()) @map("created_at")

  userWords UserWord[]
  records   LearningRecord[]

  @@map("words")
}

model UserWord {
  id           String       @id @default(uuid())
  userId       String       @map("user_id")
  wordId       String       @map("word_id")
  wordBookId   String?      @map("word_book_id")
  masteryLevel MasteryLevel @default(NEW) @map("mastery_level")
  nextReview   DateTime?    @map("next_review")
  reviewCount  Int          @default(0) @map("review_count")
  easeFactor   Float        @default(2.5) @map("ease_factor")
  addedAt      DateTime     @default(now()) @map("added_at")

  user     User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  word     Word      @relation(fields: [wordId], references: [id], onDelete: Cascade)
  wordBook WordBook? @relation(fields: [wordBookId], references: [id], onDelete: SetNull)

  @@unique([userId, wordId])
  @@map("user_words")
}

model LearningRecord {
  id           String        @id @default(uuid())
  userId       String        @map("user_id")
  wordId       String        @map("word_id")
  status       ReviewStatus
  responseTime Int           @map("response_time")
  createdAt    DateTime      @default(now()) @map("created_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  word Word @relation(fields: [wordId], references: [id], onDelete: Cascade)

  @@map("learning_records")
}

enum MasteryLevel {
  NEW
  LEARNING
  MASTERED
}

enum ReviewStatus {
  KNOWN
  FUZZY
  UNKNOWN
}
```

## 4. NestJS核心模块实现

### 4.1 认证模块 (Auth Module)

```typescript
// apps/api/src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}

// apps/api/src/modules/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile(@Request() req) {
    return this.authService.getProfile(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout() {
    return { message: 'Logout successful' };
  }
}

// apps/api/src/modules/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash: hashedPassword,
        name: dto.name,
      },
    });

    const token = this.jwtService.sign({ id: user.id });

    return {
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          dailyGoal: user.dailyGoal,
          streak: user.streak,
        },
      },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ id: user.id });

    return {
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          dailyGoal: user.dailyGoal,
          streak: user.streak,
        },
      },
    };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        dailyGoal: true,
        streak: true,
        wordsLearned: true,
        createdAt: true,
      },
    });

    return { success: true, data: user };
  }
}
```

### 4.2 AI模块 (AI Module)

```typescript
// apps/api/src/modules/ai/ai.module.ts
import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';

@Module({
  controllers: [AiController],
  providers: [AiService],
  exports: [AiService],
})
export class AIModule {}

// apps/api/src/modules/ai/ai.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AiService {
  private readonly openRouterConfig = {
    baseUrl: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
    model: 'openrouter/free',
  };

  async generateMemory(word: string, meaning: string): Promise<string> {
    const prompt = `请为单词 "${word}" (意思: ${meaning}) 生成一个简短有趣的记忆口诀。
要求：
1. 朗朗上口，易于记忆
2. 包含单词在生活中的应用场景
3. 限制在80字以内
4. 用中文回复`;

    return this.generateText(prompt);
  }

  async generateExamples(word: string, meaning: string): Promise<string[]> {
    const prompt = `请为单词 "${word}" (意思: ${meaning}) 生成3个例句。
要求：
1. 句子自然流畅
2. 包含中文翻译
3. 每条限制在80字以内`;

    const response = await this.generateText(prompt);
    return response.split('\n').filter(s => s.trim());
  }

  async generateImage(word: string, meaning: string): Promise<string> {
    const imagePrompt = `Create a memorable, visually striking illustration that represents the word "${word}" meaning "${meaning}". Style: modern minimalist with warm colors. The image should help remember this vocabulary word.`;

    try {
      const response = await axios.post(
        `${this.openRouterConfig.baseUrl}/images/generations`,
        {
          model: 'openrouter/free',
          prompt: imagePrompt,
          n: 1,
          size: '512x512',
        },
        {
          headers: {
            'Authorization': `Bearer ${this.openRouterConfig.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data.data[0]?.url || '';
    } catch (error) {
      console.error('Image generation failed:', error);
      return '';
    }
  }

  private async generateText(prompt: string, maxTokens = 500): Promise<string> {
    try {
      const response = await axios.post(
        `${this.openRouterConfig.baseUrl}/chat/completions`,
        {
          model: this.openRouterConfig.model,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: maxTokens,
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.openRouterConfig.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('OpenRouter API Error:', error);
      throw new Error('AI generation failed');
    }
  }
}

// apps/api/src/modules/ai/ai.controller.ts
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AiService } from './ai.service';

@Controller('words/ai')
@UseGuards(AuthGuard('jwt'))
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate')
  async generate(@Body() dto: { word: string; meaning: string }) {
    const [memory, examples] = await Promise.all([
      this.aiService.generateMemory(dto.word, dto.meaning),
      this.aiService.generateExamples(dto.word, dto.meaning),
    ]);

    return {
      success: true,
      data: { memory, examples },
    };
  }

  @Post('image')
  async generateImage(@Body() dto: { word: string; meaning: string }) {
    const imageUrl = await this.aiService.generateImage(dto.word, dto.meaning);

    return {
      success: true,
      data: { imageUrl },
    };
  }
}
```

### 4.3 学习模块 (Learning Module)

```typescript
// apps/api/src/modules/learning/learning.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LearningService {
  constructor(private readonly prisma: PrismaService) {}

  async getTodayTask(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { dailyGoal: true },
    });

    const todayWords = await this.prisma.userWord.findMany({
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
        newWords: todayWords,
        reviewWords,
        totalToday: todayWords.length + reviewWords.length,
      },
    };
  }

  async getReviewQueue(userId: string) {
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

  async submitLearning(
    userId: string,
    wordId: string,
    status: 'KNOWN' | 'FUZZY' | 'UNKNOWN',
    responseTime: number,
  ) {
    const userWord = await this.prisma.userWord.findUnique({
      where: { userId_wordId: { userId, wordId } },
    });

    if (!userWord) {
      throw new Error('Word not found in user vocabulary');
    }

    const quality = status === 'KNOWN' ? 5 : status === 'FUZZY' ? 3 : 1;
    const { nextReview, newEaseFactor, newInterval } = this.calculateNextReview(
      userWord.easeFactor,
      userWord.reviewCount,
      quality,
    );

    const masteryLevel = quality >= 4 ? 'MASTERED' : 'LEARNING';

    await this.prisma.$transaction([
      this.prisma.userWord.update({
        where: { userId_wordId: { userId, wordId } },
        data: {
          nextReview,
          easeFactor: newEaseFactor,
          reviewCount: { increment: 1 },
          masteryLevel,
        },
      }),
      this.prisma.learningRecord.create({
        data: {
          userId,
          wordId,
          status,
          responseTime,
        },
      }),
      this.prisma.user.update({
        where: { id: userId },
        data: {
          wordsLearned: { increment: status === 'KNOWN' ? 1 : 0 },
          lastActive: new Date(),
        },
      }),
    ]);

    return {
      success: true,
      data: {
        wordId,
        nextReview,
        masteryLevel,
        interval: newInterval,
      },
    };
  }

  private calculateNextReview(
    easeFactor: number,
    reviewCount: number,
    quality: number,
  ): { nextReview: Date; newEaseFactor: number; newInterval: number } {
    let interval: number;

    if (quality < 3) {
      interval = 1;
    } else {
      if (reviewCount === 0) interval = 1;
      else if (reviewCount === 1) interval = 6;
      else interval = Math.round(reviewCount * easeFactor);
    }

    let newEaseFactor = easeFactor;
    if (quality >= 3) {
      newEaseFactor = Math.max(
        1.3,
        easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)),
      );
    }

    const nextReview = new Date(Date.now() + interval * 24 * 60 * 60 * 1000);

    return { nextReview, newEaseFactor, newInterval: interval };
  }

  async getStats(userId: string) {
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

    const weeklyRecords = await this.prisma.learningRecord.findMany({
      where: {
        userId,
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
      select: {
        status: true,
        createdAt: true,
      },
    });

    return {
      success: true,
      data: {
        streak: user?.streak || 0,
        wordsLearned: user?.wordsLearned || 0,
        todayLearned: todayRecords,
        weeklyStats: weeklyRecords,
      },
    };
  }
}
```

### 4.4 单词模块 (Words Module)

```typescript
// apps/api/src/modules/words/words.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WordsService } from './words.service';
import { AddWordDto } from './dto';

@Controller('words')
@UseGuards(AuthGuard('jwt'))
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  async getWords(
    @Body('category') category?: string,
    @Body('page') page = 1,
    @Body('limit') limit = 20,
  ) {
    return this.wordsService.getWords(category, page, limit);
  }

  @Get(':id')
  async getWord(@Param('id') id: string) {
    return this.wordsService.getWord(id);
  }

  @Post()
  async addWord(@Body() dto: AddWordDto) {
    return this.wordsService.addWord(dto);
  }
}
```

## 5. API设计

### 5.1 RESTful API 端点

| 方法 | 端点 | 描述 | 认证 |
|------|------|------|------|
| **认证相关** |
| POST | /api/auth/register | 用户注册 | 否 |
| POST | /api/auth/login | 用户登录 | 否 |
| POST | /api/auth/logout | 登出 | 是 |
| GET | /api/auth/me | 获取当前用户 | 是 |
| **单词相关** |
| GET | /api/words | 获取单词列表 | 是 |
| GET | /api/words/:id | 获取单词详情 | 是 |
| POST | /api/words | 添加新单词 | 是 |
| POST | /api/words/ai/generate | AI生成记忆内容 | 是 |
| POST | /api/words/ai/image | AI生成单词图片 | 是 |
| **学习相关** |
| GET | /api/learning/today | 获取今日学习任务 | 是 |
| GET | /api/learning/review | 获取待复习单词 | 是 |
| POST | /api/learning/submit | 提交学习结果 | 是 |
| GET | /api/learning/stats | 获取学习统计 | 是 |
| **词库相关** |
| GET | /api/wordbooks | 获取词库列表 | 是 |
| POST | /api/wordbooks | 创建词库 | 是 |
| POST | /api/wordbooks/:id/words | 添加单词到词库 | 是 |
| DELETE | /api/wordbooks/:id/words/:wordId | 从词库移除单词 | 是 |
| **用户相关** |
| GET | /api/users/profile | 获取用户资料 | 是 |
| PUT | /api/users/profile | 更新用户资料 | 是 |
| PUT | /api/users/settings | 更新用户设置 | 是 |

### 5.2 DTO 示例

```typescript
// apps/api/src/modules/auth/dto/auth.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(2)
  name: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

// apps/api/src/modules/learning/dto/learning.dto.ts
import { IsEnum, IsNumber, IsUUID } from 'class-validator';

export class SubmitLearningDto {
  @IsUUID()
  wordId: string;

  @IsEnum(['KNOWN', 'FUZZY', 'UNKNOWN'])
  status: 'KNOWN' | 'FUZZY' | 'UNKNOWN';

  @IsNumber()
  responseTime: number;
}
```

## 6. 全局配置与启动

### 6.1 Main Application

```typescript
// apps/api/src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(process.env.PORT || 5000);
  console.log(`Application running on port ${process.env.PORT || 5000}`);
}

bootstrap();
```

### 6.2 Root Module

```typescript
// apps/api/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { WordsModule } from './modules/words/words.module';
import { LearningModule } from './modules/learning/learning.module';
import { WordbookModule } from './modules/wordbook/wordbook.module';
import { AIModule } from './modules/ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    WordsModule,
    LearningModule,
    WordbookModule,
    AIModule,
  ],
})
export class AppModule {}
```

## 7. 部署架构

### 7.1 Docker配置

```yaml
# docker-compose.yml
version: '3.8'

services:
  client:
    build: ./apps/client
    ports:
      - "3000:80"
    depends_on:
      - api
    networks:
      - app-network

  api:
    build: ./apps/api
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/vocab
      - REDIS_URL=redis://cache:6379
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
      - JWT_SECRET=${JWT_SECRET}
      - CLIENT_URL=http://localhost:3000
    depends_on:
      - db
      - cache
    networks:
      - app-network

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=vocab
      - POSTGRES_PASSWORD=password
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - app-network

  cache:
    image: redis:7-alpine
    networks:
      - app-network

volumes:
  pgdata:

networks:
  app-network:
    driver: bridge
```

### 7.2 NestJS Dockerfile

```dockerfile
# apps/api/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start:prod"]
```

### 7.3 环境变量

```env
# .env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/vocab

# Redis
REDIS_URL=redis://localhost:6379

# OpenRouter
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxxxxxxx
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

## 8. NestJS优势

### 8.1 核心特性

- **依赖注入** - 使用@Injectable装饰器实现松耦合
- **模块化** - 清晰的模块划分，易于维护
- **装饰器** - 使用TypeScript装饰器简化代码
- **验证** - 内置class-validator进行DTO验证
- **守卫** - @UseGuards实现权限控制
- **管道** - 内置转换和验证管道
- **拦截器** - 统一处理响应格式

### 8.2 开发体验

```bash
# 启动开发服务器
npm run start:dev

# 构建生产版本
npm run build

# 运行测试
npm run test

# 生成资源
nest g resource modules/xxx
```

## 9. 安全考虑

### 9.1 认证与授权

- JWT令牌认证（7天过期）
- bcrypt密码加密（盐值轮数：10）
- @UseGuards全局守卫
- 角色装饰器（可选扩展）

### 9.2 数据安全

- HTTPS传输
- Prisma防止SQL注入
- 输入验证（class-validator）
- Rate Limiting（可选）

## 10. 开发规范

### 10.1 代码组织

```
模块结构：
├── dto/              # 数据传输对象
│   ├── create-xxx.dto.ts
│   └── update-xxx.dto.ts
├── entities/         # 实体定义
├── guards/           # 守卫
├── strategies/       # 策略
├── *.module.ts       # 模块定义
├── *.controller.ts   # 控制器
└── *.service.ts      # 服务
```

### 10.2 命名规范

- **类名**: PascalCase (UserService, AuthController)
- **文件名**: kebab-case (user-service.ts, auth-controller.ts)
- **变量**: camelCase (userId, dailyGoal)
- **常量**: SCREAMING_SNAKE_CASE (MAX_RETRIES)
- **DTO**: PascalCase + Dto后缀 (CreateUserDto, LoginDto)
