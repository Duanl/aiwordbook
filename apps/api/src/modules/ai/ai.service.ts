import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AiService {
  private readonly openRouterConfig = {
    baseUrl: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY || '',
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
      return 'AI生成暂时不可用，请稍后再试';
    }
  }
}
