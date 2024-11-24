import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class TeamPlayer {

  @PrimaryColumn()
  team_id: number;

  @PrimaryColumn()
  player_id: number;

}
