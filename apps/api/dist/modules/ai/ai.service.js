"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
let AiService = class AiService {
    constructor() {
        this.openRouterConfig = {
            baseUrl: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
            apiKey: process.env.OPENROUTER_API_KEY || '',
            model: 'openrouter/free',
        };
    }
    async generateMemory(word, meaning) {
        const prompt = `请为单词 "${word}" (意思: ${meaning}) 生成一个简短有趣的记忆口诀。
要求：
1. 朗朗上口，易于记忆
2. 包含单词在生活中的应用场景
3. 限制在80字以内
4. 用中文回复`;
        return this.generateText(prompt);
    }
    async generateExamples(word, meaning) {
        const prompt = `请为单词 "${word}" (意思: ${meaning}) 生成3个例句。
要求：
1. 句子自然流畅
2. 包含中文翻译
3. 每条限制在80字以内`;
        const response = await this.generateText(prompt);
        return response.split('\n').filter(s => s.trim());
    }
    async generateText(prompt, maxTokens = 500) {
        try {
            const response = await axios_1.default.post(`${this.openRouterConfig.baseUrl}/chat/completions`, {
                model: this.openRouterConfig.model,
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
                max_tokens: maxTokens,
                temperature: 0.7,
            }, {
                headers: {
                    'Authorization': `Bearer ${this.openRouterConfig.apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data.choices[0]?.message?.content || '';
        }
        catch (error) {
            console.error('OpenRouter API Error:', error);
            return 'AI生成暂时不可用，请稍后再试';
        }
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)()
], AiService);
//# sourceMappingURL=ai.service.js.map