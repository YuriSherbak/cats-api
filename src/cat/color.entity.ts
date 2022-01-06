import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cat } from './cat.entity';

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  color_id: string;

  @Column()
  color_name: string;

  @OneToMany(() => Cat, (cat) => cat.color)
  cats: Cat[];
}
