import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Cat } from './cat.entity';

@Entity()
export class Color {
  @PrimaryColumn()
  color_id: string;

  @Column()
  color_name: string;

  @OneToMany(() => Cat, (cat) => cat.color)
  cats: Cat[];
}
