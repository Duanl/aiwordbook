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

    subgraph Backend
        E[Express.js Server] --> F[PostgreSQL Database]
        E --> G[Redis Cache]
        E --> H[OpenRouter API]
        E --> I[JWT Auth]
    end

    subgraph ExternalServices
        H --> J[AI Models]
    end

    Client <-->|REST API / WebSocket| Backend
    Backend <-->|Data| PostgreSQL
    Backend <-->|Cache| Redis
    Backend <-->|AI Inference| OpenRouter
```

### 1.2 技术栈详情

| 层级 | 技术选型 | 说明 |
|------|----------|------|
| **前端** | React 18 + TypeScript | 组件化开发 |
| **构建** | Vite | 快速HMR |
| **样式** | Tailwind CSS | 原子化CSS |
| **状态** | Zustand | 轻量状态管理 |
| **路由** | React Router v6 | SPA路由 |
| **后端** | Node.js + Express.js | RESTful API |
| **数据库** | PostgreSQL | 关系型数据 |
| **缓存** | Redis | 会话和热点数据 |
| **ORM** | Prisma | 类型安全数据库访问 |
| **认证** | JWT + bcrypt | 无状态认证 |
| **AI服务** | OpenRouter API | 调用free模型 |
| **部署** | Docker | 容器化部署 |

## 2. 项目结构

```
/workspace
├── client/                    # 前端项目
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── layout/
│   │   │   ├── WordCard.tsx
│   │   │   ├── ProgressRing.tsx
│   │   │   └── StatsChart.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Learn.tsx
│   │   │   ├── Review.tsx
│   │   │   ├── Wordbook.tsx
│   │   │   ├── Login.tsx
│   │   │   └── Profile.tsx
│   │   ├── stores/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── types/
│   │   └── data/
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── server/                    # 后端项目
│   ├── src/
│   │   ├── main.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── words.ts
│   │   │   ├── learning.ts
│   │   │   └── ai.ts
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── utils/
│   │   └── config/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   └── tsconfig.json
│
├── docker-compose.yml
├── .env.example
└── README.md
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

### 3.2 表结构定义

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
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
  streak       Int      @default(0)
  createdAt    DateTime @default(now()) @map("created_at")
  lastActive   DateTime @default(now()) @map("last_active")

  wordBooks      WordBook[]
  learningRecords LearningRecord[]
  words          UserWord[]

  @@map("users")
}

model WordBook {
  id        String   @id @default(uuid())
  userId    String   @map("user_id")
  name      String
  category  String
  createdAt DateTime @default(now()) @map("created_at")

  user  User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  words UserWord[]

  @@map("word_books")
}

model Word {
  id            String   @id @default(uuid())
  word          String
  phonetic      String
  meaning       String
  partOfSpeech  String   @map("part_of_speech")
  examples      String[]
  aiMemory      String?  @map("ai_memory")
  aiImageUrl    String?  @map("ai_image_url")
  masteryLevel  MasteryLevel @default(NEW) @map("mastery_level")
  nextReview    DateTime? @map("next_review")
  reviewCount   Int      @default(0) @map("review_count")
  easeFactor    Float    @default(2.5) @map("ease_factor")

  userWords     UserWord[]
  records       LearningRecord[]

  @@unique([word])
  @@map("words")
}

model UserWord {
  id          String   @id @default(uuid())
  userId      String   @map("user_id")
  wordId      String   @map("word_id")
  wordBookId  String?  @map("word_book_id")
  masteryLevel MasteryLevel @default(NEW) @map("mastery_level")
  nextReview  DateTime? @map("next_review")
  reviewCount Int      @default(0) @map("review_count")
  easeFactor  Float    @default(2.5) @map("ease_factor")
  addedAt     DateTime @default(now()) @map("added_at")

  user     User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  word     Word      @relation(fields: [wordId], references: [id], onDelete: Cascade)
  wordBook WordBook? @relation(fields: [wordBookId], references: [id], onDelete: SetNull)

  @@unique([userId, wordId])
  @@map("user_words")
}

model LearningRecord {
  id           String   @id @default(uuid())
  userId       String   @map("user_id")
  wordId       String   @map("word_id")
  status       ReviewStatus
  responseTime Int      @map("response_time")
  createdAt   DateTime @default(now()) @map("created_at")

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

## 4. API设计

### 4.1 RESTful API 端点

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
| GET | /api/user/profile | 获取用户资料 | 是 |
| PUT | /api/user/profile | 更新用户资料 | 是 |
| PUT | /api/user/settings | 更新用户设置 | 是 |

### 4.2 API请求/响应示例

```typescript
// POST /api/auth/login
// Request
{
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "User",
      "dailyGoal": 20,
      "streak": 5
    }
  }
}

// POST /api/learning/submit
// Request
{
  "wordId": "uuid",
  "status": "KNOWN", // KNOWN | FUZZY | UNKNOWN
  "responseTime": 2500 // milliseconds
}

// Response
{
  "success": true,
  "data": {
    "wordId": "uuid",
    "nextReview": "2024-01-15T10:00:00Z",
    "masteryLevel": "LEARNING",
    "wordsLearned": 25,
    "streak": 6
  }
}

// POST /api/words/ai/generate
// Request
{
  "word": "ephemeral",
  "meaning": "lasting for a very short time"
}

// Response
{
  "success": true,
  "data": {
    "memory": "e-ph-e-m-e-ral: 短暂的，像蜉蝣一样朝生暮死，美好却转瞬即逝~",
    "examples": [
      "Fad diets are ephemeral and often unhealthy. 流行饮食法只是昙花一现，而且往往不健康。",
      "The ephemeral beauty of cherry blossoms makes them precious. 樱花短暂的美丽使它们格外珍贵。"
    ]
  }
}
```

## 5. 后端架构

### 5.1 控制器-服务-仓储模式

```mermaid
flowchart LR
    A[Routes] --> B[Controllers]
    B --> C[Services]
    C --> D[Repositories]
    D --> E[Database]
    C --> F[External APIs]
```

### 5.2 核心服务实现

```typescript
// src/services/wordService.ts
import { Word, PrismaClient } from '@prisma/client';
import { openaiService } from './openaiService';

const prisma = new PrismaClient();

export class WordService {
  async generateAIMemory(word: string, meaning: string): Promise<string> {
    const prompt = `请为单词 "${word}" (意思: ${meaning}) 生成一个简短有趣的记忆口诀。
要求：
1. 朗朗上口，易于记忆
2. 包含单词在生活中的应用场景
3. 限制在80字以内
4. 用中文回复`;

    return await openaiService.generateText(prompt);
  }

  async generateExamples(word: string, meaning: string): Promise<string[]> {
    const prompt = `请为单词 "${word}" (意思: ${meaning}) 生成3个例句。
要求：
1. 句子自然流畅
2. 包含中文翻译
3. 每条限制在80字以内`;

    const response = await openaiService.generateText(prompt);
    return response.split('\n').filter(s => s.trim());
  }

  async calculateNextReview(
    currentEaseFactor: number,
    reviewCount: number,
    quality: number // 0-5
  ): Promise<{ nextReview: Date; newEaseFactor: number }> {
    let interval: number;
    let newEaseFactor = currentEaseFactor;

    if (quality < 3) {
      interval = 1;
    } else {
      if (reviewCount === 0) interval = 1;
      else if (reviewCount === 1) interval = 6;
      else interval = Math.round(reviewCount * currentEaseFactor);

      newEaseFactor = Math.max(
        1.3,
        currentEaseFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
      );
    }

    const nextReview = new Date(Date.now() + interval * 24 * 60 * 60 * 1000);

    return { nextReview, newEaseFactor };
  }

  async submitLearningResult(
    userId: string,
    wordId: string,
    status: 'KNOWN' | 'FUZZY' | 'UNKNOWN',
    responseTime: number
  ) {
    const userWord = await prisma.userWord.findUnique({
      where: { userId_wordId: { userId, wordId } }
    });

    if (!userWord) throw new Error('Word not found in user vocabulary');

    const quality = status === 'KNOWN' ? 5 : status === 'FUZZY' ? 3 : 1;
    const { nextReview, newEaseFactor } = await this.calculateNextReview(
      userWord.easeFactor,
      userWord.reviewCount,
      quality
    );

    const masteryLevel = quality >= 4 ? 'MASTERED' : 'LEARNING';

    await prisma.$transaction([
      prisma.userWord.update({
        where: { userId_wordId: { userId, wordId } },
        data: {
          nextReview,
          easeFactor: newEaseFactor,
          reviewCount: { increment: 1 },
          masteryLevel
        }
      }),
      prisma.learningRecord.create({
        data: {
          userId,
          wordId,
          status,
          responseTime
        }
      }),
      prisma.user.update({
        where: { id: userId },
        data: {
          wordsLearned: { increment: status === 'KNOWN' ? 1 : 0 },
          streak: { increment: 1 }
        }
      })
    ]);

    return { nextReview, masteryLevel };
  }
}

export const wordService = new WordService();
```

### 5.3 OpenRouter服务

```typescript
// src/services/openaiService.ts
import axios from 'axios';

const OPENROUTER_CONFIG = {
  baseUrl: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  model: 'openrouter/free',
};

export class OpenAIService {
  async generateText(prompt: string, maxTokens = 500): Promise<string> {
    try {
      const response = await axios.post(
        `${OPENROUTER_CONFIG.baseUrl}/chat/completions`,
        {
          model: OPENROUTER_CONFIG.model,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: maxTokens,
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENROUTER_CONFIG.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('OpenRouter API Error:', error);
      throw new Error('AI generation failed');
    }
  }
}

export const openaiService = new OpenAIService();
```

## 6. 前端架构

### 6.1 状态管理 (Zustand)

```typescript
// stores/userStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  dailyGoal: number;
  streak: number;
}

interface UserState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (email, password) => {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const { data } = await response.json();
        set({
          user: data.user,
          token: data.token,
          isAuthenticated: true
        });
      },
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      updateProfile: (data) => set((state) => ({
        user: state.user ? { ...state.user, ...data } : null
      }))
    }),
    { name: 'vocab-user' }
  )
);
```

### 6.2 API服务层

```typescript
// services/api.ts
const API_BASE = '/api';

class ApiService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  }

  async login(email: string, password: string) {
    return this.request<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  }

  async getTodayTask() {
    return this.request<LearningTask>('/learning/today');
  }

  async submitLearning(wordId: string, status: string, responseTime: number) {
    return this.request<LearningResult>('/learning/submit', {
      method: 'POST',
      body: JSON.stringify({ wordId, status, responseTime })
    });
  }

  async generateAIMemory(word: string, meaning: string) {
    return this.request<{ memory: string; examples: string[] }>('/words/ai/generate', {
      method: 'POST',
      body: JSON.stringify({ word, meaning })
    });
  }
}

export const api = new ApiService();
```

## 7. 部署架构

### 7.1 Docker配置

```yaml
# docker-compose.yml
version: '3.8'

services:
  client:
    build: ./client
    ports:
      - "3000:80"
    depends_on:
      - server
    networks:
      - app-network

  server:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/vocab
      - REDIS_URL=redis://cache:6379
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
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

### 7.2 环境变量

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
```

## 8. 安全考虑

### 8.1 认证与授权
- JWT令牌认证，设置合理的过期时间
- 密码使用bcrypt加密存储
- API端点权限校验
- 防止SQL注入和XSS攻击

### 8.2 数据安全
- HTTPS传输
- 敏感数据加密
- 数据库定期备份
- 用户数据隔离

## 9. 性能优化

### 9.1 前端优化
- React组件懒加载
- 图片懒加载和CDN加速
- 状态管理选择器优化
- 请求去重和防抖

### 9.2 后端优化
- Redis缓存热点数据
- 数据库索引优化
- API响应压缩
- 连接池管理

## 10. 开发规范

### 10.1 Git分支策略
```
main          → 生产环境
develop       → 开发主分支
feature/*     → 功能分支
fix/*         → 修复分支
```

### 10.2 代码规范
- ESLint + Prettier统一代码风格
- TypeScript严格模式
- 提交信息规范化 (Conventional Commits)
- API响应格式统一
