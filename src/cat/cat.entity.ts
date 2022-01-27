import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn} from 'typeorm';
import { Breed } from './breed.entity';
import { Color } from './color.entity';
import {Image} from "../image/image.entity";
import {Field, ObjectType} from "@nestjs/graphql";

@Entity()
@ObjectType()
export class Cat {
  @Field(type => String, {nullable: false})
  @PrimaryColumn()
  public id: string;

  @Field(type => String)
  @Column()
  public name: string;

  @Field(type => Number, {nullable:true})
  @Column({
    nullable: true
  })
  public age?: number;

  @Field(type => Number, {nullable:true})
  @Column()
  public cost: number;

  @Field(type => Boolean, {nullable:true})
  @Column({
    default: false
  })
  public isReserved: boolean = false;

  @Field(type => Breed, {nullable:true})
  @ManyToOne(() => Breed, breed => breed.cats,
      {eager: true, onUpdate: "CASCADE", onDelete: "CASCADE"})
  @JoinColumn({
    name: 'breed_id'
  })
  public breed: Breed;

  @Field(type => Color, {nullable:true})
  @ManyToOne(() => Color, color => color.cats,
      {eager: true, onUpdate: "CASCADE", onDelete: "CASCADE"})
  @JoinColumn({
    name: 'color_id'
  })
  public color: Color;

  @Field(type => Image, {nullable: true})
  @OneToOne(
      ()=>Image,
      {
        eager: true,
        nullable: true
      })
  @JoinColumn({
    name: "photo"
  })
  public image?: Image;
}


