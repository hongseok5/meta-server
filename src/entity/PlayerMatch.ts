import { PrimaryColumn } from "typeorm";
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PlayerMatch {

  @PrimaryColumn()
  match_id: number;
  
  @PrimaryColumn()
  player_id: number;

  @Column()
  score: number;

  @Column()
  asist: string;

  @Column()
  position: number;

  @Column()
  rmk1: string;

  @Column()
  rmk2: string;

}
