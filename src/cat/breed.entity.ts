import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Cat } from './cat.entity';

@Entity()
export class Breed {
  @PrimaryColumn()
  public breed_id: string;

  @Column({
    unique: true
  })
  public breed_name: string;

  @OneToMany(() => Cat, cats => cats.breed)
  cats: Cat[];
}
