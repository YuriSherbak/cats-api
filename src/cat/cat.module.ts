import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cat.entity';
import { Breed } from './breed.entity';
import { Color } from './color.entity';
import {ImageService} from "../image/image.service";
import {Image} from "../image/image.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Cat, Breed, Color, Image])],
  controllers: [CatController],
  providers: [CatService, ImageService],
})
export class CatModule {}
