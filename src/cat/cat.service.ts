import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {DeleteResult, Repository} from 'typeorm';
import { Cat } from './cat.entity';
import { Breed } from './breed.entity';
import { Color } from './color.entity';
import {CreateCatDto} from "./dto/create-cat.dto";
import {UpdateCatDto} from "./dto/update-cat.dto";
import {CreateBreedDto} from "./dto/create-breed.dto";
import {CreateColorDto} from "./dto/create-color.dto";
import {ImageService} from "../image/image.service";
import {Image} from "../image/image.entity";
import {v4 as uuid} from 'uuid';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
    @InjectRepository(Breed)
    private breedRepository: Repository<Breed>,
    @InjectRepository(Color)
    private colorRepository: Repository<Color>,
    private readonly imageService: ImageService
  ) {}

  async getAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  async getOneCat(id: number): Promise<Cat> {
    const cat = await  this.catsRepository.findOne(id);
    if (!cat) {
      throw new HttpException('[this cat was not found]', HttpStatus.NOT_FOUND);
    }

    return cat;
  }

  async createBreed(dto: CreateBreedDto) {
    const breed_id = `${uuid()}`;
    const breed = this.breedRepository.create({...dto, breed_id})
    return this.breedRepository.save(breed)
  }

  async createColor(dto:CreateColorDto) {
    const color_id = `${uuid()}`;
    const color = this.colorRepository.create({...dto, color_id})
    return this.colorRepository.save(color)
  }

  async createCat(dto: CreateCatDto): Promise<Cat>{
    let id = `${uuid()}`;
    let breed = await this.breedRepository.findOne({where: {breed_name: dto.breed_name}});
    let color = await  this.colorRepository.findOne({where: {color_name: dto.color_name}});
    if(!breed) {
      const newBreed = this.createBreed(dto);
      breed = await newBreed;
    }
    if(!color) {
      const newColor = this.createColor(dto);
      color = await newColor;
    }

    const cat = this.catsRepository.create({...dto, id, breed: breed, color: color});
    return this.catsRepository.save(cat);
  }

  async reserveCat(id: number): Promise<Cat> {
    const cat = await this.catsRepository.findOne(id);
    if (!cat) {
      throw new HttpException('[this cat was not found]', HttpStatus.NOT_FOUND);
    }
    else {
      await this.catsRepository.update(id, { isReserved: true });
      return this.catsRepository.findOne(id)
    }
  }

  async unreserveCat(id: number): Promise<Cat> {
    const cat = await this.catsRepository.findOne(id);
    if (!cat) {
      throw new HttpException('[this cat was not found]', HttpStatus.NOT_FOUND);
    }
    await this.catsRepository.update(id, { isReserved: false });
    return this.catsRepository.findOne(id);
  }

  async getReserveCat(): Promise<Cat[]> {
    return this.catsRepository.find({ where: { isReserved: true } });
  }

  async removeCat(id: number): Promise<DeleteResult> {
    const cat = await this.catsRepository.findOne(id)
    if (!cat) {
      throw new HttpException('[this cat was not found]', HttpStatus.NOT_FOUND);
    }
    return this.catsRepository.delete(id);
  }

  async updateCat(id: number, dto: UpdateCatDto): Promise<Cat | string> {
    const cat = await this.catsRepository.findOne(id);
    if(!cat) {
      throw new HttpException('[this cat was not found]', HttpStatus.NOT_FOUND);
    }
    const breed= await this.breedRepository.findOne({breed_name: dto.breed_name})
    if(dto.breed_name) {
      if(!breed) {
        return "[First create a breed]";
      }
    }

    const color = await this.colorRepository.findOne({color_name: dto.color_name})
    if (dto.color_name) {
      if (!color) {
        return "[First create a color]";
      }
    }

    const updateCat = this.catsRepository.create({...cat,...dto, color: color, breed: breed});
    return this.catsRepository.save(updateCat);
  }

  async addImage(id: number, imageBuffer: Buffer, filename: string): Promise<Image> {
    const image = await this.imageService.uploadPublicFile(imageBuffer, filename);
    const cat = await this.catsRepository.findOne(id);
    const imgCat = this.catsRepository.create({...cat, image: image});
    await this.catsRepository.save(imgCat);
    return image;
  }
}
