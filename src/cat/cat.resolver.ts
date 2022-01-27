import {Args, Mutation, Parent, Query, ResolveField, Resolver} from "@nestjs/graphql";
import {CatService} from "./cat.service";
import {Cat} from "./cat.entity";
import {CatInput} from "./dto/cat.input";
import {Image} from "../image/image.entity";
import {Breed} from "./breed.entity";
import {BreedInput} from "./dto/breed.input";
import {Color} from "./color.entity";
import {ColorInput} from "./dto/color.input";
import {FileUpload, GraphQLUpload} from "graphql-upload"

@Resolver(of => Cat)
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
    createCat(@Args('data')catInput: CatInput): Promise<Cat> {
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
    createBreed(@Args('data') breedInput: BreedInput): Promise<Breed> {
        return this.catService.createBreed(breedInput);
     }

    @Mutation(returns => Color)
    createColor(@Args('data') colorInput: ColorInput): Promise<Color> {
        return this.catService.createColor(colorInput);
    }

    @ResolveField('nameBreedConcatenation', returns=>String)
     async nameBreedConcatenation(@Parent() cat: Cat): Promise<string> {
        return `${cat.name}  ${cat.breed.breed_name}`;
    }

    @Mutation(returns => Cat)
    updateCat(@Args('id', {type: ()=> String}) id: string,
              @Args('data') catInput: CatInput) {
        return this.catService.updateCat(id, catInput);
    }
}