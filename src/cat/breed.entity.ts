import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Cat } from './cat.entity';
import {Field, ObjectType} from "@nestjs/graphql";

@Entity()
@ObjectType()
export class Breed {
  @Field(type => String)
  @PrimaryColumn()
  public breed_id: string;

  @Field(type => String)
  @Column({
    unique: true
  })
  public breed_name: string;

  @Field(type => [Cat])
  @OneToMany(() => Cat, cats => cats.breed)
  cats: Cat[];
}
