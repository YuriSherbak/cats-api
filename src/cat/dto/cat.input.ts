import {Field, InputType} from "@nestjs/graphql";
import {BreedInput} from "./breed.input";
import {ColorInput} from "./color.input";

@InputType()
export class CatInput {
    @Field()
    name: string;
    @Field()
    age?: number;
    @Field({nullable: true})
    cost: number;
    @Field()
    breed: BreedInput;
    @Field()
    color: ColorInput;
}