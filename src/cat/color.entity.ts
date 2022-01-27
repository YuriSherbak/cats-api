import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Cat } from './cat.entity';
import {Field, ObjectType} from "@nestjs/graphql";

@Entity()
@ObjectType()
export class Color {

  @Field(type => String, {nullable:false})
  @PrimaryColumn()
  color_id: string;

  @Field(type => String, {nullable:true})
  @Column({
    unique: true
  })
  color_name: string;

  @Field(type => [Cat], {nullable:true})
  @OneToMany(() => Cat, (cat) => cat.color)
  cats: Cat[];
}
