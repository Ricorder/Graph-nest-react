import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import nodeFetch from 'node-fetch';
import { NewBanner } from 'src/banner/banner.schema';

@Injectable()
export class ApiService {
  @Cron('* * * * * *')
  async handleCron() {
    const dataApi = await nodeFetch(
      'http://europe-west3-trying-artics-pipeline.cloudfunctions.net/random-generator',
    );
    const resBody = await dataApi.json()
    resBody.title = 'Statistic';
    resBody.impressions = Math.round(resBody.impressions);
    resBody.clicks = Math.round(resBody.clicks);
    resBody.costs = Math.round(resBody.costs);
    // console.log('this.api', this.api); 
    return resBody
  }
}
