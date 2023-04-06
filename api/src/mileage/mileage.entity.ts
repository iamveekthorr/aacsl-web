import { User } from '../user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('mileage')
export class Mileage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  startPosition: string;

  @Column()
  endPosition: string;

  @Column({ default: false })
  roundTrip: boolean;

  @ManyToOne(() => User, (user) => user.mileage)
  user: User;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
