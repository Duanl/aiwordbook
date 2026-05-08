import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AiService } from './ai.service';

@ApiTags('AI')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate')
  @ApiOperation({ summary: '生成AI内容' })
  async generate(@Body() body: { word: string; meaning: string }) {
    return this.aiService.generateMemory(body.word, body.meaning);
  }
}
