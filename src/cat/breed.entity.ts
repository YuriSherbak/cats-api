import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cat } from './cat.entity';

@Entity()
export class Breed {
  @PrimaryGeneratedColumn()
  public breed_id: number;

  @Column({
    unique: true
  })
  public breed_name: string;

  @OneToMany(() => Cat, cats => cats.breed)
  cats: Cat[];
}
