import { Test, TestingModule } from '@nestjs/testing';
import { readFileSync } from 'fs';
import { join } from 'path';
import { CrawlerService } from './crawler.service';

const BASE_URL: string = join(__dirname, '../common/fixtures');

jest.mock('../common/lib/request.lib', () => ({
  default: {
    get: jest.fn((url) => Promise.resolve({ data: String(readFileSync(url)) })),
  },
}));

describe('CrawlerService', () => {
  let service: CrawlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrawlerService],
    }).compile();

    service = module.get<CrawlerService>(CrawlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able scrape', async () => {
    const url = `${BASE_URL}/Shimakaze.html`;
    const result = await service.crawl(url, {
      boteName: {
        selector: '#firstHeading',
        how: 'text',
      },
      boteAvatar: {
        selector: '.nomobile img',
        attr: 'src',
      },
    });

    expect(result).toEqual(
      expect.objectContaining({
        boteName: 'Shimakaze',
        boteAvatar:
          'https://azurlane.netojuu.com/w/images/thumb/b/b3/ShimakazeShipyardIcon.png/161px-ShimakazeShipyardIcon.png',
      }),
    );
  });
});
