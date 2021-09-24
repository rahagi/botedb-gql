import { Inject, Injectable } from '@nestjs/common';
import { ScrapeOptions } from 'scrape-it';
import { getFullSizeArt } from '../common/helpers/url.helper';
import {
  normalizeRarityNum,
  toTitleCase,
} from '../common/helpers/string.helper';
import { CrawlerService } from '../crawler/crawler.service';
import { Illustrator } from './entities/illustrator.entity ';
import { Ship } from './entities/ship.entity';
import { Skill } from './entities/skill.entity';
import { Stats } from './entities/stats.entity';
import { VoiceActor } from './entities/voiceactor.entity';

@Injectable()
export class ShipsService {
  constructor(
    private readonly crawler: CrawlerService,
    @Inject('BASE_URL') private readonly baseUrl: string,
  ) {}

  private async crawl<T>(path: string, options: ScrapeOptions): Promise<T> {
    const url = `${this.baseUrl}/${path}`;
    return this.crawler.crawl(url, options);
  }

  public async getBaseShip(name: string): Promise<Ship> {
    return <Promise<Ship>>this.crawl(name, {
      name: {
        selector: '#firstHeading',
        how: 'text',
      },
      avatarUrl: {
        selector: '.nomobile img',
        attr: 'src',
      },
      artUrl: {
        selector: '.azl_box_body img',
        attr: 'src',
        convert: (x: string) => getFullSizeArt(x),
      },
      artRetrofitUrl: {
        selector: '.tabbertab[title="Retrofit"] img',
        attr: 'src',
        convert: (x: string) => getFullSizeArt(x),
      },
      jpName: {
        selector: 'span[lang=ja]',
        texteq: 0,
      },
      westTwName: {
        selector: 'span[lang=zh]',
        texteq: 0,
      },
      fullName: {
        selector: '.nomobile b',
        texteq: 0,
      },
      rarity: {
        selector: 'th:contains("Rarity")+td',
        texteq: 0,
      },
      class: {
        selector: 'th:contains("Class")+td a',
        texteq: 0,
      },
      faction: {
        selector: 'th:contains("Faction")+td a',
        texteq: 0,
      },
    });
  }

  public async getShips(): Promise<Ship[]> {
    const scrapped: any = await this.crawl('List_of_Ships_by_Image', {
      ships: {
        listItem: '.azl-shipcard',
        data: {
          name: {
            selector: '.truncate',
          },
          avatarUrl: {
            selector: '.alc-img a img',
            attr: 'src',
          },
          rarity: {
            selector: '.alc-img',
            attr: 'class',
            convert: (x: string) =>
              normalizeRarityNum(x.split(' ')[1].split('-')[1]),
          },
          class: {
            selector: '.alc-middle a',
            attr: 'href',
            convert: (x: string) => {
              x = toTitleCase(
                x
                  .replace(/.*\//, '')
                  .split(':')[1]
                  .split('_')
                  .join(' ')
                  .slice(0, -1),
              );
              return x;
            },
          },
        },
      },
    });
    const result = scrapped.ships;
    return result;
  }

  public async getStats(ship: Ship): Promise<Stats[]> {
    const scrapped: any = await this.crawl(ship.name, {
      stats: {
        listItem:
          '.nomobile div div div .wikitable tbody tr:not(:first-child, :last-child)',
        data: {
          statsLvl: {
            selector: 'td b',
            texteq: 0,
          },
          hp: {
            selector: 'td',
            eq: 1,
            convert: (x) => Number(x),
          },
          fp: {
            selector: 'td',
            eq: 2,
            convert: (x) => Number(x),
          },
          trp: {
            selector: 'td',
            eq: 3,
            convert: (x) => Number(x),
          },
          avi: {
            selector: 'td',
            eq: 4,
            convert: (x) => Number(x),
          },
          aa: {
            selector: 'td',
            eq: 5,
            convert: (x) => Number(x),
          },
          rld: {
            selector: 'td',
            eq: 6,
            convert: (x) => Number(x),
          },
          eva: {
            selector: 'td',
            eq: 7,
            convert: (x) => Number(x),
          },
          armorType: {
            selector: 'td',
            eq: 8,
          },
          spd: {
            selector: 'td',
            eq: -5,
            convert: (x) => Number(x),
          },
          acc: {
            selector: 'td',
            eq: -4,
            convert: (x) => Number(x),
          },
          lck: {
            selector: 'td',
            eq: -3,
            convert: (x) => Number(x),
          },
          asw: {
            selector: 'td',
            eq: -2,
            convert: (x) => Number(x),
          },
          oil: {
            selector: 'td',
            eq: -1,
            convert: (x) => Number(x),
          },
        },
      },
    });
    scrapped.stats = scrapped.stats.filter((s) => s.statsLvl);
    const result: Stats[] = scrapped.stats;
    const armorType = result[0].armorType;
    result.forEach((r) => (r.armorType = armorType));
    return result;
  }

  public async getSkills(ship: Ship): Promise<Skill[]> {
    const scrapped: any = await this.crawl(ship.name, {
      skills: {
        listItem:
          '.mw-collapsible.wikitable:not([border]) tr:not(:first-child)',
        data: {
          name: {
            selector: 'td b',
          },
          skillType: {
            selector: 'td',
            eq: 1,
            attr: 'style',
            convert: (x: string) => {
              const matches = x.match(/(Pink|Gold|DeepSkyBlue)/g);
              return matches && matches.pop();
            },
          },
          description: {
            selector: 'td',
            eq: 2,
            how: 'html',
          },
        },
      },
    });
    let result: Skill[] = scrapped.skills;
    result = result.filter((r) => r.name);
    return result;
  }

  public async getIllustrator(ship: Ship): Promise<Illustrator> {
    const scrapped: any = await this.crawl(ship.name, {
      name: {
        selector: 'th:contains("Illustrator")+td a',
        eq: 0,
      },
      socials: {
        listItem: 'th:contains("Illustrator")+td a:not(:first-child)',
        data: {
          url: {
            attr: 'href',
          },
        },
      },
    });
    scrapped.socials = scrapped.socials.map((s) => s.url);
    scrapped.socials = Array.from(new Set(scrapped.socials));
    const result: Illustrator = scrapped;
    return result;
  }

  public async getVoiceActor(ship: Ship): Promise<VoiceActor> {
    const scrapped: any = await this.crawl(ship.name, {
      name: {
        selector: 'th+td a:last-child',
        eq: 1,
      },
      oggSamples: {
        listItem: '.sm2_button',
        data: {
          ogg: {
            attr: 'href',
          },
        },
      },
    });
    scrapped.oggSamples = scrapped.oggSamples.map((s) => s.ogg);
    const result: VoiceActor = scrapped;
    return result;
  }
}
