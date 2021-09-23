import { Test, TestingModule } from '@nestjs/testing';
import { readFileSync } from 'fs';
import { join } from 'path';
import { CrawlerService } from '../crawler/crawler.service';
import { Illustrator } from './entities/illustrator.entity ';
import { Ship } from './entities/ship.entity';
import { Skill } from './entities/skill.entity';
import { Stats } from './entities/stats.entity';
import { VoiceActor } from './entities/voiceactor.entity';
import { ShipsService } from './ships.service';

jest.mock('../common/lib/request.lib', () => ({
  default: {
    get: jest.fn((url) =>
      Promise.resolve({ data: String(readFileSync(`${url}.html`)) }),
    ),
  },
}));

describe('ShipsService', () => {
  let service: ShipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShipsService,
        CrawlerService,
        {
          provide: 'BASE_URL',
          useValue: join(__dirname, '../common/fixtures'),
        },
      ],
    }).compile();

    service = module.get<ShipsService>(ShipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to get base ship data', async () => {
    const shipName = 'U-47';
    const result: Ship = await service.getBaseShip(shipName);
    console.log(result);

    expect(result).toBeTruthy();
  });

  it('should be able to get all ships', async () => {
    const result: Ship[] = await service.getShips();

    expect(result).toBeTruthy();
  });

  it('should be able to get stats data based on ship', async () => {
    const ship = <Ship>{ name: 'U-47' };
    const result: Stats[] = await service.getStats(ship);

    expect(result).toBeTruthy();
  });

  it('should be able to get skills data based on ship', async () => {
    const ship = <Ship>{ name: 'Shimakaze' };
    const result: Skill[] = await service.getSkills(ship);

    expect(result).toBeTruthy();
  });

  it('should be able to get illustrator data based on ship', async () => {
    const ship = <Ship>{ name: 'Shimakaze' };
    const result: Illustrator = await service.getIllustrator(ship);

    expect(result).toBeTruthy();
  });

  it('should be able to get VA data based on ship', async () => {
    const ship = <Ship>{ name: 'Shimakaze' };
    const result: VoiceActor = await service.getVoiceActor(ship);

    expect(result).toBeTruthy();
  });
});
