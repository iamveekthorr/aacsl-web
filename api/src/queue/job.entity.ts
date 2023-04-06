import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  to: string;

  @Column()
  subject: string;

  @Column()
  templateKey: string;

  @Column({ type: 'bit', default: false })
  processed: boolean;

  @Column({ type: 'nvarchar', length: 4000, nullable: true })
  data: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
