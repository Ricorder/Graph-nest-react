import { IsNumber } from 'class-validator';

export class Banner {
  @IsNumber()
  impressions: number;

  @IsNumber()
  clicks: number;

  @IsNumber()
  costs: number;
}
