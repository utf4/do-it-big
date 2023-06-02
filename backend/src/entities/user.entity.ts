import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Email } from './email.entity';

@Entity('users')
class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  firstName: string;

  @Column({ type: 'varchar', nullable: true })
  lastName: string;

  @Column({ nullable: false, unique: true, type: 'varchar' })
  email: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Email, (email) => email.sender)
  sentEmails: Email[];

  @OneToMany(() => Email, (email) => email.receiver)
  receivedEmails: Email[];

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;
}

export default User;
