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

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
    @InjectRepository(Breed)
    private breedRepository: Repository<Breed>,
    @InjectRepository(Color)
    private colorRepository: Repository<Color>,
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
    const breed = this.breedRepository.create(dto)
    return this.breedRepository.save(breed)
  }

  async createColor(dto:CreateColorDto) {
    const color = this.colorRepository.create(dto)
    return this.colorRepository.save(color)
  }

  async createCat(dto: CreateCatDto): Promise<Cat>{
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

    const cat = this.catsRepository.create({...dto, breed: breed, color: color});
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

}
