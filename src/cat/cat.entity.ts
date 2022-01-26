import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import { Breed } from './breed.entity';
import { Color } from './color.entity';
import {Image} from "../image/image.entity";
import {Field, ObjectType} from "@nestjs/graphql";

@Entity()
@ObjectType()
export class Cat {
  @Field(type => String)
  @PrimaryColumn()
  public id: string;

  @Field(type => String)
  @Column()
  public name: string;

  @Field(type => Number)
  @Column({
    nullable: true
  })
  public age?: number;

  @Field(type => Number)
  @Column()
  public cost: number;

  @Field(type => Boolean)
  @Column({
    default: false
  })
  public isReserved: boolean = false;

  @Field(type => Breed)
  @ManyToOne(() => Breed, breed => breed.cats,
      {eager: true, onUpdate: "CASCADE", onDelete: "CASCADE"})
  @JoinColumn({
    name: 'breed_id'
  })
  public breed: Breed;

  @Field(type => Color)
  @ManyToOne(() => Color, color => color.cats,
      {eager: true, onUpdate: "CASCADE", onDelete: "CASCADE"})
  @JoinColumn({
    name: 'color_id'
  })
  public color: Color;

  @Field(type => Image)
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


