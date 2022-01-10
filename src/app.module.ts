import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cat/cat.entity';
import { Breed } from './cat/breed.entity';
import { Color } from './cat/color.entity';
import { CatModule } from './cat/cat.module';
import {AwsSdkModule} from "nest-aws-sdk";
import { SharedIniFileCredentials, S3, config } from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';


@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        password: '3012',
        username: 'postgres',
        database: 'cats_db',
        entities: [Cat, Breed, Color],
        synchronize: true,
        autoLoadEntities: true,
    }),
    CatModule,
      AwsSdkModule.forRoot({
        defaultServiceOptions: {
          region: 'us-east-1',
          accessKeyId: 'AKIA2U3K53D5T5JFHAQP',
          secretAccessKey: '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',
          credentials: new SharedIniFileCredentials({
            profile: 's3-manager'
          }),
        },
        services: [S3],
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
