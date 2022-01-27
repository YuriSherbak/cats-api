import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Cat } from './cat.entity';
import {Field, ObjectType} from "@nestjs/graphql";

@Entity()
@ObjectType()
export class Breed {
  @Field(type => String, {nullable:false})
  @PrimaryColumn()
  public breed_id: string;

  @Field(type => String, {nullable:true})
  @Column({
    unique: true
  })
  public breed_name: string;

  @Field(type => [Cat], {nullable:true})
  @OneToMany(() => Cat, cats => cats.breed)
  cats: Cat[];
}
