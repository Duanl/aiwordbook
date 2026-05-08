import { Controller, Get, Post, Body, Param, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { WordsService } from './words.service';

@ApiTags('单词')
@ApiBearerAuth()
@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: '获取单词列表' })
  async getWords(
    @Query('category') category?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.wordsService.getWords({ category, page, limit });
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单词详情' })
  async getWord(@Param('id') id: string) {
    return this.wordsService.getWord(id);
  }

  @Post('ai/generate')
  @ApiOperation({ summary: 'AI生成记忆内容' })
  async generateAI(@Body() body: { word: string; meaning: string }) {
    return this.wordsService.generateAI(body.word, body.meaning);
  }
}
