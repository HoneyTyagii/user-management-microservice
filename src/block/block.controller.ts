import { Controller, Post, Param } from '@nestjs/common';
import { BlockService } from './block.service';

@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post(':userId/:blockedUserId')
  blockUser(@Param('userId') userId: string, @Param('blockedUserId') blockedUserId: string): Promise<void> {
    return this.blockService.blockUser(userId, blockedUserId);
  }

  @Post('unblock/:userId/:blockedUserId')
  unblockUser(@Param('userId') userId: string, @Param('blockedUserId') blockedUserId: string): Promise<void> {
    return this.blockService.unblockUser(userId, blockedUserId);
  }
}