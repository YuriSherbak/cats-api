import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Cat } from './cat.entity';
import {Field, ObjectType} from "@nestjs/graphql";

@Entity()
@ObjectType()
export class Color {

  @Field(type => String)
  @PrimaryColumn()
  color_id: string;

  @Field(type => String)
  @Column()
  color_name: string;

  @Field(type => [Cat])
  @OneToMany(() => Cat, (cat) => cat.color)
  cats: Cat[];
}
