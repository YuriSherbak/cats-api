import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class BreedInput{
    @Field()
    breed_name: string;
}