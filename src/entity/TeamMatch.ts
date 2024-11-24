import { Entity, PrimaryGeneratedColumn, Column,PrimaryColumn } from 'typeorm';

@Entity()
export class TeamMatch {

  @PrimaryColumn()
  match_id: number;

  @Column()
  home_team_id: number;

  @Column()
  away_team_id: number;

  @Column()
  home_team_score: number;

  @Column()
  away_team_score: number;


}
