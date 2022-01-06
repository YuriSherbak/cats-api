import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Breed } from './breed.entity';
import { Color } from './color.entity';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column({
    nullable: true
  })
  public age?: number;

  @Column({
    unique: true,
    nullable: true
  })
  public image?: string;

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
}
