import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Game {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  datetime: string;

  @Column()
  location: string;
}
