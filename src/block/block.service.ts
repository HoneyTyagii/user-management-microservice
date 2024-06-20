import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Block } from './schemas/block.schema';

@Injectable()
export class BlockService {
  constructor(
    @InjectModel(Block.name) private readonly blockModel: Model<Block>,
  ) {}

  async blockUser(userId: string, blockedUserId: string): Promise<void> {
    const block = new this.blockModel({ userId, blockedUserId });
    await block.save();
  }

  async unblockUser(userId: string, blockedUserId: string): Promise<void> {
    await this.blockModel.deleteOne({ userId, blockedUserId }).exec();
  }
}