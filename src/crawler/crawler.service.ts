import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { scrapeHTML, ScrapeOptions } from 'scrape-it';
import request from '../common/lib/request.lib';

@Injectable()
export class CrawlerService {
  public async fetch(url: string): Promise<AxiosResponse> {
    return request.get(url);
  }

  public scrape<T>(html: string, options: ScrapeOptions): T {
    return scrapeHTML(html, options);
  }

  public async crawl<T>(url: string, options: ScrapeOptions): Promise<T> {
    const response: AxiosResponse = await this.fetch(encodeURI(url));
    return this.scrape(response.data, options);
  }
}
