import { Module } from '@nestjs/common';
import { CrawlerModule } from 'src/crawler/crawler.module';
import { CrawlerService } from 'src/crawler/crawler.service';
import { ShipsResolver } from './ships.resolver';
import { ShipsService } from './ships.service';

@Module({
  imports: [CrawlerModule],
  providers: [
    ShipsResolver,
    ShipsService,
    CrawlerService,
    {
      provide: 'BASE_URL',
      useValue: 'https://azurlane.koumakan.jp',
    },
  ],
})
export class ShipsModule {}
