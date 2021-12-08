import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';
import * as mongoose from 'mongoose';

export type BannerDocument = Banner & mongoose.Document;

@Schema()
@ObjectType()
export class Banner {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field()
  title: string;

  @Prop({ required: true })
  @Field(() => Int)
  impressions: number;

  @Prop({ required: true })
  @Field(() => Int)
  clicks: number;

  @Prop({ required: true })
  @Field(() => Int)
  costs: number;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);

@InputType()
export class NewBanner {
  @Field()
  title: string;

  @Field(() => Int)
  impressions: number;

  @Field(() => Int)
  clicks: number;

  @Field(() => Int)
  costs: number;
}

@InputType()
export class Api {
  @Field(() => Int)
  impressions: number;

  @Field(() => Int)
  clicks: number;

  @Field(() => Int)
  costs: number;
}

@InputType()
export class FindBanner {
  @Field()
  _id: string;
}
