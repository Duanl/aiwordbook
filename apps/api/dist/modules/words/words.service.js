"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const ai_service_1 = require("../ai/ai.service");
let WordsService = class WordsService {
    constructor(prisma, aiService) {
        this.prisma = prisma;
        this.aiService = aiService;
    }
    async getWords(query) {
        const { category, page = 1, limit = 20 } = query;
        const where = {};
        if (category) {
            where.userWords = {
                some: {
                    wordBook: {
                        category: category
                    }
                }
            };
        }
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
            success: true,
            data: words,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async getWord(id) {
        const word = await this.prisma.word.findUnique({
            where: { id },
        });
        if (!word) {
            throw new Error('Word not found');
        }
        return { success: true, data: word };
    }
    async generateAI(word, meaning) {
        const [memory, examples] = await Promise.all([
            this.aiService.generateMemory(word, meaning),
            this.aiService.generateExamples(word, meaning),
        ]);
        return {
            success: true,
            data: { memory, examples },
        };
    }
};
exports.WordsService = WordsService;
exports.WordsService = WordsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ai_service_1.AiService])
], WordsService);
//# sourceMappingURL=words.service.js.map