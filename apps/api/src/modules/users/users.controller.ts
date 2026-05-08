import { Controller, Get, Put, Body, Request } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('用户')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: '获取用户资料' })
  async getProfile(@Request() req: any) {
    const user = await this.usersService.findById(req.user.id);
    return { success: true, data: user };
  }

  @Put('profile')
  @ApiOperation({ summary: '更新用户资料' })
  async updateProfile(@Request() req: any, @Body() data: { name?: string; avatar?: string; dailyGoal?: number }) {
    const user = await this.usersService.updateProfile(req.user.id, data);
    return { success: true, data: user };
  }
}
