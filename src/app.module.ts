import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cat/cat.entity';
import { Breed } from './cat/breed.entity';
import { Color } from './cat/color.entity';
import { CatModule } from './cat/cat.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
