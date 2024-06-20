import { Test, TestingModule } from '@nestjs/testing';
import { BlockService } from './block.service';
import { Block } from '../block/schemas/block.schema';

describe('BlockService', () => {
  let service: BlockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlockService],
    }).compile();

    service = module.get<BlockService>(BlockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
