import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BusinessEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;
}
