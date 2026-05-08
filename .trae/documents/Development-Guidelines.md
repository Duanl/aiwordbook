# AI词汇大师 - 开发规范手册

## 一、项目规范

### 1.1 技术栈版本

#### 前端技术栈
| 技术 | 版本 | 说明 |
|------|------|------|
| Node.js | ≥ 18.0.0 | 开发环境 |
| React | 18.x | UI框架 |
| TypeScript | 5.x | 类型系统 |
| Vite | 5.x | 构建工具 |
| Tailwind CSS | 3.x | 样式方案 |
| Zustand | 4.x | 状态管理 |
| React Router | 6.x | 路由管理 |
| React Native | 0.73.x | 移动端 |

#### 后端技术栈
| 技术 | 版本 | 说明 |
|------|------|------|
| Node.js | ≥ 18.0.0 | 运行环境 |
| NestJS | 10.x | Web框架 |
| TypeScript | 5.x | 类型系统 |
| Prisma | 5.x | ORM |
| PostgreSQL | 15.x | 数据库 |
| Redis | 7.x | 缓存 |
| Docker | 24.x | 容器化 |

#### 开发工具
| 工具 | 版本 | 说明 |
|------|------|------|
| Git | 2.40+ | 版本控制 |
| VSCode | Latest | 代码编辑器 |
| pnpm | 8.x | 包管理器 |

### 1.2 项目结构规范

#### Monorepo结构
```
ai-vocab-master/
├── apps/
│   ├── client/                    # Web应用
│   │   ├── src/
│   │   │   ├── components/        # 组件
│   │   │   │   ├── ui/           # 基础UI组件
│   │   │   │   ├── layout/       # 布局组件
│   │   │   │   └── features/      # 功能组件
│   │   │   ├── pages/            # 页面
│   │   │   ├── hooks/            # 自定义Hook
│   │   │   ├── stores/           # 状态管理
│   │   │   ├── services/         # API服务
│   │   │   ├── utils/            # 工具函数
│   │   │   ├── types/            # 类型定义
│   │   │   ├── constants/         # 常量
│   │   │   └── styles/           # 样式
│   │   ├── public/               # 静态资源
│   │   ├── tests/                # 测试文件
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │   └── tailwind.config.js
│   │
│   ├── mobile/                    # React Native App
│   │
│   ├── mini-program/              # 微信小程序
│   │
│   ├── official-account/          # 公众号H5
│   │
│   └── api/                       # NestJS后端
│       ├── src/
│       │   ├── modules/           # 功能模块
│       │   │   ├── auth/
│       │   │   ├── user/
│       │   │   ├── word/
│       │   │   ├── learning/
│       │   │   ├── wordbook/
│       │   │   └── wechat/
│       │   ├── common/            # 公共模块
│       │   │   ├── decorators/
│       │   │   ├── guards/
│       │   │   ├── interceptors/
│       │   │   ├── filters/
│       │   │   └── pipes/
│       │   ├── config/            # 配置
│       │   ├── prisma/           # 数据库
│       │   └── utils/            # 工具
│       ├── test/                  # 测试
│       ├── prisma/                # Prisma Schema
│       ├── package.json
│       ├── tsconfig.json
│       └── nest-cli.json
│
├── packages/
│   └── shared/                    # 共享包
│       ├── src/
│       │   ├── types/             # 共享类型
│       │   ├── api/               # API类型
│       │   ├── constants/         # 共享常量
│       │   └── utils/             # 共享工具
│       └── package.json
│
├── docs/                          # 文档
├── docker-compose.yml
├── .env.example
├── .eslintrc.js
├── .prettierrc
├── package.json
└── README.md
```

### 1.3 Git工作流程

#### 分支命名规范
```
格式: <type>/<issue-id>-<short-description>

示例:
- feature/123-add-user-login
- fix/456-fix-auth-bug
- hotfix/789-critical-security-patch
- chore/001-update-dependencies
- refactor/234-improve-api-performance
```

#### 分支类型
| 类型 | 说明 | 示例 |
|------|------|------|
| `feature/` | 新功能开发 | feature/123-add-wechat-login |
| `fix/` | Bug修复 | fix/456-fix-word-display |
| `hotfix/` | 紧急修复 | hotfix/789-fix-payment |
| `refactor/` | 代码重构 | refactor/234-optimize-query |
| `chore/` | 工具更新 | chore/001-update-deps |
| `docs/` | 文档更新 | docs/123-update-readme |

#### Commit规范
```
格式: <type>(<scope>): <subject>

示例:
feat(auth): add WeChat login functionality
fix(learning): correct word review calculation
docs(readme): update installation guide
style(ui): adjust button padding
refactor(api): simplify authentication flow
test(word): add unit tests for word service
chore(deps): update React to v18
```

#### Commit类型
| 类型 | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug修复 |
| `docs` | 文档更新 |
| `style` | 代码格式（不影响功能） |
| `refactor` | 重构（不是新功能或修复） |
| `perf` | 性能优化 |
| `test` | 测试相关 |
| `chore` | 构建/工具更新 |

#### Pull Request规范
```markdown
## 变更类型
- [ ] 新功能
- [ ] Bug修复
- [ ] 重构
- [ ] 文档更新

## 变更描述
请简要描述本次变更...

## 关联Issue
Closes #123

## 检查清单
- [ ] 代码遵循项目规范
- [ ] 添加了必要的测试
- [ ] 更新了相关文档
- [ ] 通过CI/CD检查
```

## 二、前端开发规范

### 2.1 TypeScript规范

#### 类型定义
```typescript
// ✅ 好的实践
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

type UserRole = 'admin' | 'user' | 'guest';

interface LoginDTO {
  email: string;
  password: string;
}

// ❌ 避免使用 any
// ❌ 避免使用 Object 类型
```

#### 函数类型
```typescript
// ✅ 函数签名清晰
type RequestHandler = (request: Request) => Promise<Response>;
type ClickHandler = (event: MouseEvent) => void;

// ✅ 泛型使用
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ✅ 联合类型
type LoadingState = 'idle' | 'loading' | 'success' | 'error';
```

### 2.2 React组件规范

#### 组件文件结构
```typescript
// components/WordCard/WordCard.tsx
import React from 'react';
import { useState } from 'react';
import styles from './WordCard.module.css';

interface WordCardProps {
  word: string;
  phonetic: string;
  meaning: string;
  onFlip?: () => void;
  onSelect?: (status: 'known' | 'fuzzy' | 'unknown') => void;
}

export const WordCard: React.FC<WordCardProps> = ({
  word,
  phonetic,
  meaning,
  onFlip,
  onSelect,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    onFlip?.();
  };

  return (
    <div className={styles.card}>
      <div className={styles.word}>{word}</div>
      <div className={styles.phonetic}>{phonetic}</div>
      {isFlipped && <div className={styles.meaning}>{meaning}</div>}
    </div>
  );
};

// 组件导出
export default WordCard;
```

#### Hooks使用规范
```typescript
// ✅ 使用自定义Hook
export const useWordCard = (initialWord: Word) => {
  const [word, setWord] = useState(initialWord);
  const [isFlipped, setIsFlipped] = useState(false);
  const [aiContent, setAiContent] = useState<AIContent | null>(null);

  const flip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  const generateAIContent = useCallback(async () => {
    const content = await aiService.generateMemory(word.word, word.meaning);
    setAiContent(content);
  }, [word.word, word.meaning]);

  return {
    word,
    isFlipped,
    aiContent,
    flip,
    generateAIContent,
  };
};
```

#### 样式规范
```typescript
// ✅ 使用CSS Modules或Tailwind
// CSS Modules
import styles from './WordCard.module.css';

// Tailwind CSS
<div className="bg-white rounded-xl p-6 shadow-md">
  <h2 className="text-2xl font-bold text-gray-800">{word}</h2>
</div>
```

### 2.3 状态管理规范

#### Zustand Store规范
```typescript
// stores/wordStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WordState {
  words: Word[];
  currentIndex: number;
  isLoading: boolean;
  
  // Actions
  setWords: (words: Word[]) => void;
  nextWord: () => void;
  resetIndex: () => void;
}

export const useWordStore = create<WordState>()(
  persist(
    (set, get) => ({
      words: [],
      currentIndex: 0,
      isLoading: false,
      
      setWords: (words) => set({ words, currentIndex: 0 }),
      
      nextWord: () => {
        const { currentIndex, words } = get();
        if (currentIndex < words.length - 1) {
          set({ currentIndex: currentIndex + 1 });
        }
      },
      
      resetIndex: () => set({ currentIndex: 0 }),
    }),
    {
      name: 'word-storage',
      partialize: (state) => ({ words: state.words }),
    }
  )
);
```

### 2.4 API调用规范

```typescript
// services/api/client.ts
class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.message || 'Request failed', response.status);
    }

    return data;
  }

  // GET请求
  async get<T>(endpoint: string): Promise<T> {
    const response = await this.request<T>(endpoint, { method: 'GET' });
    return response.data;
  }

  // POST请求
  async post<T>(endpoint: string, body: unknown): Promise<T> {
    const response = await this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    return response.data;
  }
}

// 使用示例
export const wordApi = {
  getWords: (params: GetWordsParams) => 
    api.get<Word[]>(`/words?${queryString.stringify(params)}`),
  
  submitLearning: (data: SubmitLearningDTO) =>
    api.post<LearningResult>('/learning/submit', data),
};
```

## 三、后端开发规范

### 3.1 NestJS模块规范

#### 模块结构
```typescript
// modules/word/word.module.ts
import { Module } from '@nestjs/common';
import { WordController } from './word.controller';
import { WordService } from './word.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WordController],
  providers: [WordService],
  exports: [WordService],
})
export class WordModule {}
```

#### Controller规范
```typescript
// modules/word/word.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WordService } from './word.service';
import { CreateWordDto, GetWordsDto, GenerateAIDto } from './dto';

@Controller('words')
@UseGuards(AuthGuard('jwt'))
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Get()
  async getWords(@Query() query: GetWordsDto) {
    return this.wordService.getWords(query);
  }

  @Get(':id')
  async getWord(@Param('id', ParseUUIDPipe) id: string) {
    return this.wordService.getWord(id);
  }

  @Post()
  async createWord(@Body() dto: CreateWordDto) {
    return this.wordService.createWord(dto);
  }

  @Post('ai/generate')
  async generateAI(@Body() dto: GenerateAIDto) {
    return this.wordService.generateAI(dto);
  }
}
```

#### Service规范
```typescript
// modules/word/word.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateWordDto, GetWordsDto, GenerateAIDto } from './dto';

@Injectable()
export class WordService {
  constructor(private readonly prisma: PrismaService) {}

  async getWords(query: GetWordsDto) {
    const { category, page = 1, limit = 20 } = query;
    
    const where = category ? { category } : {};
    
    const [words, total] = await Promise.all([
      this.prisma.word.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.word.count({ where }),
    ]);

    return {
      data: words,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getWord(id: string) {
    const word = await this.prisma.word.findUnique({
      where: { id },
    });

    if (!word) {
      throw new NotFoundException('Word not found');
    }

    return word;
  }

  async createWord(dto: CreateWordDto) {
    return this.prisma.word.create({
      data: dto,
    });
  }

  async generateAI(dto: GenerateAIDto) {
    const memory = await this.aiService.generateMemory(dto.word, dto.meaning);
    const examples = await this.aiService.generateExamples(dto.word, dto.meaning);

    return { memory, examples };
  }
}
```

### 3.2 DTO验证规范

```typescript
// modules/word/dto/index.ts
import { IsString, IsOptional, IsInt, Min, Max, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWordDto {
  @IsString()
  word: string;

  @IsString()
  phonetic: string;

  @IsString()
  meaning: string;

  @IsString()
  @IsOptional()
  partOfSpeech?: string;

  @IsString({ each: true })
  @IsOptional()
  examples?: string[];
}

export class GetWordsDto {
  @IsString()
  @IsOptional()
  category?: string;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page?: number = 1;

  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  @IsOptional()
  limit?: number = 20;
}

export class GenerateAIDto {
  @IsString()
  word: string;

  @IsString()
  meaning: string;
}
```

### 3.3 数据库规范

#### Prisma Schema规范
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
  output   = "../node_modules/.prisma/client"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  // 关系定义
  words Word[]

  @@map("users")
}

model Word {
  id       String @id @default(uuid())
  word     String @unique
  phonetic String
  meaning  String

  // 索引
  @@index([word])
  @@map("words")
}
```

#### 命名规范
| 类型 | 规范 | 示例 |
|------|------|------|
| 表名 | 小写下划线，复数 | `user_words` |
| 列名 | 小写下划线 | `created_at` |
| 索引 | `idx_<table>_<column>` | `idx_users_email` |
| 外键 | `<table>_<column>_fkey` | `user_words_user_id_fkey` |

## 四、API设计规范

### 4.1 RESTful API规范

#### URL规范
```
资源命名: /api/{resource}
复数形式: /api/words (不是 /api/word)
嵌套资源: /api/wordbooks/{id}/words
过滤参数: /api/words?category=cet4&page=1
```

#### HTTP方法使用
| 方法 | 用途 | 示例 |
|------|------|------|
| GET | 获取资源 | GET /api/words |
| POST | 创建资源 | POST /api/words |
| PUT | 更新资源（完整） | PUT /api/users/1 |
| PATCH | 更新资源（部分） | PATCH /api/users/1 |
| DELETE | 删除资源 | DELETE /api/words/1 |

### 4.2 响应格式规范

#### 成功响应
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "word": "ephemeral",
    "meaning": "短暂的"
  },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

#### 错误响应
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### 4.3 状态码规范
| 状态码 | 说明 | 适用场景 |
|--------|------|----------|
| 200 | OK | 成功获取/更新 |
| 201 | Created | 成功创建 |
| 204 | No Content | 成功删除 |
| 400 | Bad Request | 参数错误 |
| 401 | Unauthorized | 未认证 |
| 403 | Forbidden | 无权限 |
| 404 | Not Found | 资源不存在 |
| 500 | Internal Server Error | 服务器错误 |

## 五、代码质量规范

### 5.1 ESLint配置
```javascript
// .eslintrc.js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
```

### 5.2 Prettier配置
```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### 5.3 Git Hooks
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ],
    "*.{json,md}": [
      "prettier --write",
      "git add"
    ]
  }
}
```

## 六、测试规范

### 6.1 测试文件组织
```
src/
├── components/
│   └── WordCard/
│       ├── WordCard.tsx
│       └── WordCard.test.tsx
│
├── services/
│   ├── api.ts
│   └── api.test.ts
│
└── utils/
    ├── formatDate.ts
    └── formatDate.test.ts
```

### 6.2 单元测试规范
```typescript
// utils/formatDate.test.ts
import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2026-05-07T10:00:00Z');
    expect(formatDate(date)).toBe('2026-05-07');
  });

  it('should handle invalid date', () => {
    expect(formatDate(null)).toBe('Invalid Date');
  });
});
```

### 6.3 组件测试规范
```typescript
// components/Button/Button.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });
});
```

### 6.4 测试覆盖率要求
| 类型 | 最低覆盖率 |
|------|------------|
| 语句覆盖 | 80% |
| 分支覆盖 | 75% |
| 函数覆盖 | 80% |
| 行覆盖 | 80% |

## 七、环境与部署规范

### 7.1 环境配置
```bash
# .env.example
# 数据库
DATABASE_URL=postgresql://user:password@localhost:5432/vocab

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# 微信配置
WECHAT_APPID=wx...
WECHAT_APPSECRET=...
WECHAT_TOKEN=...

# OpenRouter
OPENROUTER_API_KEY=sk-or-...
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1

# 环境
NODE_ENV=development
PORT=5000
```

### 7.2 Docker配置
```dockerfile
# apps/api/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
EXPOSE 5000
CMD ["node", "dist/main.js"]
```

### 7.3 CI/CD流程
```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm lint

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm test

  build:
    needs: [lint, test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm build
```

## 八、文档规范

### 8.1 代码注释规范
```typescript
/**
 * 生成单词的记忆口诀
 * @param word - 英文单词
 * @param meaning - 中文释义
 * @returns 记忆口诀字符串
 */
async generateMemory(word: string, meaning: string): Promise<string> {
  // TODO: 添加缓存机制
  // FIXME: 处理特殊字符转义
  const prompt = `请为单词 "${word}" 生成记忆口诀...`;
  return this.openaiService.generateText(prompt);
}
```

### 8.2 README规范
```markdown
# AI词汇大师

智能AI背单词应用

## 功能特性

- 🤖 AI智能记忆
- 📚 多平台支持
- 🔄 间隔重复算法

## 快速开始

### 前置要求

- Node.js 18+
- pnpm 8+
- PostgreSQL 15+

### 安装

```bash
# 安装依赖
pnpm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件

# 启动数据库
docker-compose up -d db

# 运行迁移
pnpm --filter api prisma migrate dev

# 启动开发服务器
pnpm dev
```

## 开发

### 项目结构

```
apps/
├── client/      # Web前端
├── api/         # NestJS后端
└── ...
```

### 命令

```bash
pnpm dev          # 启动开发服务器
pnpm build        # 构建生产版本
pnpm test         # 运行测试
pnpm lint         # 代码检查
```

## 贡献

请阅读 CONTRIBUTING.md 了解贡献流程。

## 许可

MIT
```

## 九、版本管理规范

### 9.1 语义化版本
```
格式: MAJOR.MINOR.PATCH
示例: 1.2.3

- MAJOR: 不兼容的API变更
- MINOR: 向后兼容的新功能
- PATCH: 向后兼容的修复
```

### 9.2 发布流程
```bash
# 1. 更新版本
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0

# 2. 创建标签
git tag -a v1.0.0 -m "Release version 1.0.0"

# 3. 推送
git push origin main
git push origin v1.0.0
```

## 十、附录

### 10.1 常用命令

```bash
# 安装依赖
pnpm install

# 启动开发
pnpm dev

# 构建
pnpm build

# 测试
pnpm test

# 代码检查
pnpm lint

# 格式化
pnpm format

# Prisma
pnpm --filter api prisma migrate dev
pnpm --filter api prisma generate
```

### 10.2 调试技巧

```typescript
// 开发环境日志
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}

// 使用 NestJS Logger
import { Logger } from '@nestjs/common';

const logger = new Logger('WordService');
logger.log('Processing word:', word);
logger.error('Failed to process', error);
```

---

**版本信息**

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| v1.0 | 2026-05-07 | 初始版本发布 |
