import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class ColorInput{
    @Field({nullable: true})
    color_name?: string;
}