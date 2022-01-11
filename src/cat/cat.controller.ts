import {Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import {CatService} from "./cat.service";
import {Cat} from "./cat.entity";
import {CreateCatDto} from "./dto/create-cat.dto";
import {CreateBreedDto} from "./dto/create-breed.dto";
import {Breed} from "./breed.entity";
import {CreateColorDto} from "./dto/create-color.dto";
import {Color} from "./color.entity";
import {UpdateCatDto} from "./dto/update-cat.dto";
import {DeleteResult} from "typeorm";
import { Express } from 'express';
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('cats')
export class CatController {

    constructor(private readonly catService: CatService) {
    }

    @Get()
    welcome(): string {
        return '[WElCOME FROM API OF CAT BOOKING, BRO!]';
    }

    @Get('/all')
    getAll(): Promise<Cat[]> {
       return this.catService.getAll();
    }

    @Get('/:id')
    getOneCat(@Param('id') id: number): Promise<Cat> {
        return this.catService.getOneCat(id);
    }

    @Get('/all/reserved')
    getReserveCat(): Promise<Cat[]> {
        return this.catService.getReserveCat();
    }

    @Post('/create')
    createCat(@Body() dto: CreateCatDto): Promise<Cat> {
        return this.catService.createCat(dto);
    }

    @Post('/create/breed')
    createBreed(@Body() dto: CreateBreedDto): Promise<Breed> {
        return this.catService.createBreed(dto);
    }

    @Post('/create/color')
    createColor(@Body() dto: CreateColorDto): Promise<Color> {
        return this.catService.createColor(dto);
    }

    @Post('add_image/:id')
    @UseInterceptors(FileInterceptor('file'))
    async addImage(@Param('id') id: number, @UploadedFile() file: Express.Multer.File){
        return this.catService.addImage(id, file.buffer, file.originalname);
    }

    @Put('update/:id')
    updateCat(@Body() dto: UpdateCatDto, @Param('id') id: number): Promise<string | Cat> {
        return this.catService.updateCat(id, dto);
    }
    @Put('reserve/:id')
    reserveCat(@Param('id')id: number): Promise<Cat> {
        return this.catService.reserveCat(id);
    }

    @Put('unreserve/:id')
    unreserveCat(@Param('id') id: number): Promise<Cat> {
        return this.catService.unreserveCat(id);
    }

    @Delete('delete/:id')
    removeCat(@Param('id') id: number): Promise<DeleteResult> {
        return this.catService.removeCat(id);
    }
}
