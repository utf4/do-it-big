import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import User from './user.entity';
import { Email } from './email.entity';

@Entity('email_replies')
export class EmailReply {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  body: string;

  @ManyToOne(() => User, (user) => user.sentEmails)
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedEmails)
  receiver: User;

  @OneToOne(() => Email)
  @JoinColumn()
  email: Email;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  sentAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
