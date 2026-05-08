import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LearningService } from './learning.service';

@ApiTags('学习')
@Controller('learning')
export class LearningController {
  constructor(private readonly learningService: LearningService) {}

  @Get('today')
  @ApiOperation({ summary: '获取今日学习任务' })
  async getTodayTask(@Request() req: any) {
    return this.learningService.getTodayTask(req.user.id);
  }

  @Get('review')
  @ApiOperation({ summary: '获取待复习单词' })
  async getReviewWords(@Request() req: any) {
    const words = await this.learningService.getReviewQueue(req.user.id);
    return { success: true, data: words };
  }

  @Post('submit')
  @ApiOperation({ summary: '提交学习结果' })
  async submitLearning(
    @Request() req: any,
    @Body() body: { wordId: string; status: 'KNOWN' | 'FUZZY' | 'UNKNOWN'; responseTime: number },
  ) {
    return this.learningService.submitLearning(
      req.user.id,
      body.wordId,
      body.status,
      body.responseTime,
    );
  }

  @Get('stats')
  @ApiOperation({ summary: '获取学习统计' })
  async getStats(@Request() req: any) {
    return this.learningService.getStats(req.user.id);
  }
}
