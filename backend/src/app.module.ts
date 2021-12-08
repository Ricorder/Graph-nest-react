import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BannersModule } from './banner/banner.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiService } from './api/api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestjs-graphql'),
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
    }),
    BannersModule,
    HttpModule
  ],
    providers: [ApiService],
})

export class AppModule {}
