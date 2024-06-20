// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { BlockService } from './block.service';
// import { BlockController } from './block.controller';
// import { Block, BlockSchema } from './schemas/block.schema';

// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: Block.name, schema: BlockSchema }])
//   ],
//   controllers: [BlockController],
//   providers: [BlockService],
// })
// export class BlockModule {}

import { Test, TestingModule } from '@nestjs/testing';
import { BlockController } from '../block/block.controller';
import { BlockService } from '../block/block.service';
import { getModelToken } from '@nestjs/mongoose';
import { Block } from '../block/schemas/block.schema';

describe('BlockController', () => {
  let blockController: BlockController;
  let blockService: BlockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlockController],
      providers: [
        BlockService,
        {
          provide: getModelToken(Block.name),
          useValue: {},
        },
      ],
    }).compile();

    blockController = module.get<BlockController>(BlockController);
    blockService = module.get<BlockService>(BlockService);
  });

  it('should be defined', () => {
    expect(blockController).toBeDefined();
  });

  // Add more tests for BlockController methods
});
