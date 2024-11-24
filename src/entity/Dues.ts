import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Dues {

  @PrimaryGeneratedColumn()
  team_id: number;

  @Column()
  player_id: string;

  @Column()
  paid_year_month: string;

  @Column()
  amount: number;

  @Column()
  reason: string;
}
