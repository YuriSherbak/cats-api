import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cat/cat.entity';
import { Breed } from './cat/breed.entity';
import { Color } from './cat/color.entity';
import { CatModule } from './cat/cat.module';
import {ConfigModule, ConfigService} from "@nestjs/config";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Cat, Breed, Color],
      synchronize: true,
      autoLoadEntities: true

      // imports: [ConfigModule],
      // useFactory: (configService: ConfigService) => ({
      //   type: 'postgres',
      //   host: configService.get('POSTGRES_HOST'),
      //   port: +configService.get<number>('POSTGRES_PORT'),
      //   username: configService.get('POSTGRES_USER'),
      //   password: configService.get('POSTGRES_PASSWORD'),
      //   database: configService.get('POSTGRES_DATABASE'),
      //   synchronize: true,
      //   autoLoadEntities: true,
      // }),
      // inject: [ConfigService],
    }),
    CatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
