import { Args, Mutation, Resolver, Subscription, Query } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Banner, FindBanner } from './banner.schema';
import { NewBanner } from './banner.schema';
import { Api } from './banner.schema';
import { BannerService } from './banner.service';
import { BannerGuard } from './banner.guard';
import { UseGuards } from '@nestjs/common';
import { ApiService } from '../api/api.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Cron } from '@nestjs/schedule';

@Resolver(() => Banner)
export class BannerResolver {
  private pubSub: PubSub;

  constructor(
    private readonly bannerService: BannerService,
    private readonly apirService: ApiService,
  ) {
    this.pubSub = new PubSub();
  }

  @Mutation((returns) => Banner)
  async create(@Args('input') args: NewBanner): Promise<Banner> {
    const banner: Banner = await this.bannerService.create(args);
    this.pubSub.publish('bannerChanged', { bannerChanged: banner });
    return banner;
  }

  @Cron('* * * * * *')
  @Mutation((returns) => Banner)
  async change(): Promise<Banner> {
    const api: NewBanner = await this.apirService.handleCron();
    console.log('api', api);
    const _id = '61afd2db6f321e1b54c53506';
    const banner: Banner = await this.bannerService.change(_id, api);
    this.pubSub.publish('bannerChanged', { bannerChanged: banner });
    return banner;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Subscription(returns => Banner, {
    filter: (payload, variables) =>
      payload.bannerChanged.title === variables.title,
  })
  bannerChanged(@Args('title') title: string) {
    return this.pubSub.asyncIterator('bannerChanged');
  }

  @Query(() => [Banner])
  @UseGuards(BannerGuard)
  async banners() {
    return this.bannerService.findMany();
  }

  @Query(() => Banner)
  @UseGuards(BannerGuard)
  async banner(@Args('input') { _id }: FindBanner) {
    console.log(_id);
    return this.bannerService.findById(_id);
  }

  @Query(() => Banner)
  @UseGuards(BannerGuard)
  async delete(@Args('input') { _id }: FindBanner) {
    return this.bannerService.deleteById(_id);
  }
}
