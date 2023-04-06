import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;

  @Column()
  email: string;

  @CreateDateColumn()
  createAt: Date;
}
