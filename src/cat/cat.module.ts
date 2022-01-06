import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cat.entity';
import { Breed } from './breed.entity';
import { Color } from './color.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cat, Breed, Color])],
  controllers: [CatController],
  providers: [CatService],
})
export class CatModule {}
