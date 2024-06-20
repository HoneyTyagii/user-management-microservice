import { Module } from '@nestjs/common';
import { BlockController } from './block.controller';
import { BlockService } from './block.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Block, BlockSchema } from './schemas/block.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Block.name, schema: BlockSchema }])
  ],
  controllers: [BlockController],
  providers: [BlockService],
  exports: [BlockService], // Make sure BlockService is exported if needed elsewhere
})
export class BlockModule {}
