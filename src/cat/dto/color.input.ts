import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class ColorInput{
    @Field()
    color_name: string;
}