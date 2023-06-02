import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import User from './user.entity';
import { EmailReply } from './emailReply.entity';

@Entity('emails')
export class Email {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subject: string;

  @Column()
  body: string;

  @ManyToOne(() => User, (user) => user.sentEmails)
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedEmails)
  receiver: User;

  @OneToOne(() => EmailReply, (reply) => reply.email)
  emailReply: EmailReply;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  sentAt: Date;

  @Column({ default: false })
  read: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
