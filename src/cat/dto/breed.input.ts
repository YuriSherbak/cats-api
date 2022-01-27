import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class BreedInput{
    @Field({nullable: true})
    breed_name?: string;
}