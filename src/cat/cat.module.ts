import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cat.entity';
import { Breed } from './breed.entity';
import { Color } from './color.entity';
import {ImageService} from "../image/image.service";
import {Image} from "../image/image.entity";
import {CatResolver} from "./cat.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Cat, Breed, Color, Image])],
  providers: [CatService, ImageService, CatResolver],
})
export class CatModule {}
