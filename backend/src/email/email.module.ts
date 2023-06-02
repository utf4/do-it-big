import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from 'src/entities/email.entity';
import { EmailReply } from 'src/entities/emailReply.entity';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { SendEmailService } from './sendEmail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Email, EmailReply])],
  providers: [EmailService, SendEmailService],
  controllers: [EmailController],
  exports: [],
})
export class EmailModule {}
