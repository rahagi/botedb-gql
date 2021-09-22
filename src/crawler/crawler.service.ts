import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { scrapeHTML, ScrapeOptions } from 'scrape-it';
import request from '../common/lib/request';

@Injectable()
export class CrawlerService {
  public async scrape(
    url: string,
    options: ScrapeOptions,
  ): Promise<Record<string, any>> {
    const response: AxiosResponse = await request.get(url);
    return scrapeHTML(response.data, options);
  }
}
