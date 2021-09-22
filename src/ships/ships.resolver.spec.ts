import { Test, TestingModule } from '@nestjs/testing';
import { ShipsResolver } from './ships.resolver';

describe('ShipsResolver', () => {
  let resolver: ShipsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShipsResolver],
    }).compile();

    resolver = module.get<ShipsResolver>(ShipsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
