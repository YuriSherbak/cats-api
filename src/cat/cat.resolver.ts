import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {CatService} from "./cat.service";
import {Cat} from "./cat.entity";
import {CatInput} from "./dto/cat.input";
import {UploadedFile, UseInterceptors} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import {Image} from "../image/image.entity";
import {Breed} from "./breed.entity";
import {BreedInput} from "./dto/breed.input";
import {Color} from "./color.entity";
import {ColorInput} from "./dto/color.input";
import { FileUpload, GraphQLUpload } from "graphql-upload"
import {createReadStream} from "fs";

@Resolver()
export class CatResolver {
    constructor(private catService: CatService) {}

    @Query(returns => [Cat])
    getAll(): Promise<Cat[]> {
        return this.catService.getAll()
    }

    @Query(returns => Cat)
    getOneCat(@Args('id', {type:() => String})id: string): Promise<Cat> {
        return this.catService.getOneCat(id);
    }

    @Mutation(returns => Cat)
    createCat(@Args('catInput')catInput: CatInput): Promise<Cat> {
        return this.catService.createCat(catInput)
    }

    @Mutation(returns => Cat)
    reserveCat(@Args('id', {type:()=> String})id: string): Promise<Cat> {
        return this.catService.reserveCat(id);
    }

    @Mutation(returns => Cat)
    unreserveCat(@Args('id', {type:()=>String})id: string): Promise<Cat>{
        return this.catService.unreserveCat(id);
    }

    @Query(returns => [Cat])
    getAllReservingCat() {
        return this.catService.getReserveCat();
    }

    // Test it !!!
    @Mutation(returns => Image, {nullable: true})
     async addImage(@Args('id', {type:()=>String}) id: string,
                    @Args("file", {type:() => GraphQLUpload}) file: Promise<FileUpload>) {
        const { filename, createReadStream } = await file
        const stream = createReadStream()
        console.log(process.env.AWS_PUBLIC_BUCKET_NAME);
        await this.catService.addImage(id, stream, filename);
    }

     @Mutation(returns => Cat)
    deleteCat(@Args('id', {type:()=>String})id: string): Promise<Cat> {
        return this.catService.removeCat(id);
     }

     @Mutation(returns => Breed)
    createBreed(@Args('breedInput') breedInput: BreedInput): Promise<Breed> {
        return this.catService.createBreed(breedInput);
     }

    @Mutation(returns => Color)
    createColor(@Args('breedInput') colorInput: ColorInput): Promise<Color> {
        return this.catService.createColor(colorInput);
    }
}