import {Field, InputType} from "@nestjs/graphql";
import {BreedInput} from "./breed.input";
import {ColorInput} from "./color.input";
import {Color} from "../color.entity";
import {Breed} from "../breed.entity";

@InputType()
export class CatInput {
    @Field({nullable: true})
    name?: string;
    @Field({nullable: true})
    age?: number;
    @Field({nullable: true})
    cost?: number;
    @Field(() => BreedInput, {nullable: true})
    breed?: Breed;
    @Field(() => ColorInput, {nullable: true})
    color?: Color;

}