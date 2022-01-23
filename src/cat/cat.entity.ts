import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import { Breed } from './breed.entity';
import { Color } from './color.entity';
import {Image} from "../image/image.entity";


@Entity()
export class Cat {
  @PrimaryColumn()
  public id: string;

  @Column()
  public name: string;

  @Column({
    nullable: true
  })
  public age?: number;

  @Column()
  public cost: number;

  @Column({
    default: false
  })
  public isReserved: boolean = false;

  @ManyToOne(() => Breed, breed => breed.cats,
      {eager: true, onUpdate: "CASCADE", onDelete: "CASCADE"})
  @JoinColumn({
    name: 'breed_id'
  })
  public breed: Breed;

  @ManyToOne(() => Color, color => color.cats,
      {eager: true, onUpdate: "CASCADE", onDelete: "CASCADE"})
  @JoinColumn({
    name: 'color_id'
  })
  public color: Color;

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
