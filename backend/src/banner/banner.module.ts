import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BannerResolver } from './banner.resolver';
import { Banner, BannerSchema } from './banner.schema';
import { BannerService } from './banner.service';
import { ApiService } from '../api/api.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Banner.name, schema: BannerSchema }]),
  ],
  providers: [BannerResolver, BannerService, ApiService],
})
export class BannersModule {}
