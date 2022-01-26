import {Column, Entity, PrimaryColumn} from "typeorm";
import {Field, ObjectType} from "@nestjs/graphql";

@Entity()
@ObjectType()
export class Image {
    @Field(type => String)
    @PrimaryColumn()
    public id:string;

    @Field(type => String)
    @Column()
    public url: string;

    @Field(type => String)
    @Column()
    public key:string;
}
