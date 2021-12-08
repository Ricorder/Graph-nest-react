import { Injectable } from '@nestjs/common';
import { Banner, BannerDocument, FindBanner, NewBanner } from './banner.schema';
import banners from '../data/banners';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BannerService {
  banners: Partial<Banner>[];
  constructor(
    @InjectModel(Banner.name) private bannerModel: Model<BannerDocument>,
  ) {
    this.banners = banners;
  }

  async create(banner: NewBanner) {
    return this.bannerModel.create(banner);
  }

  async change(id: string, args: NewBanner) {
    return this.bannerModel.findByIdAndUpdate(id, args, { new: true }).lean();
  }

  async findMany() {
    return this.bannerModel.find().lean();
  }

  async findById(id: string) {
    return this.bannerModel.findById(id).lean();
  }

  async deleteById(id: string) {
    return this.bannerModel.findByIdAndDelete(id).exec();
  }
}
