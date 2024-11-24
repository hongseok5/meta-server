import { Entity, PrimaryGeneratedColumn, Column,PrimaryColumn } from 'typeorm';

@Entity()
export class Menu {
  @PrimaryColumn()
  menu_id: string;

  @Column()
  menu_name: string;

  @Column()
  menu_seq: number;
}
