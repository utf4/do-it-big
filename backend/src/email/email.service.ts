import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { Email } from 'src/entities/email.entity';
import { EmailReply } from 'src/entities/emailReply.entity';
import User from 'src/entities/user.entity';
import { Repository } from 'typeorm';
const AWS = require('aws-sdk');
import { SES } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { SendEmailService } from './sendEmail.service';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(Email) private emailRepository: Repository<Email>,
    @InjectRepository(EmailReply)
    private replyRepository: Repository<EmailReply>,
    private readonly sendEmailService: SendEmailService,
  ) {}

  async getUserReceivedEmails(userDetail: User) {
    let response: any = { error: false, data: [] };
    try {
      const emails = await this.emailRepository.find({
        where: { receiver: { id: userDetail.id } },
        relations: ['sender'],
      });

      const obscuredEmail = await this.prepareResponseData(emails);
      response = {
        error: false,
        data: obscuredEmail,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return response;
  }

  async getEmailById(emailId: string) {
    try {
      let response: any = { error: false, data: {} };
      const email = await this.emailRepository.findOne({
        where: { id: emailId },
        relations: ['emailReply'],
      });
      response = { error: false, data: email };
      return response;
    } catch (error) {
      throw new BadRequestException('No record found');
    }
  }

  async sendEmailReply(userDetail: User, body: string, emailId: string) {
    let response: any = { error: false, data: {} };
    try {
      const isReplied = await this.isEmailAlreadyReplied(emailId);
      if (isReplied) throw new BadRequestException('Email already replied');
      const email = await this.emailRepository.findOne({
        where: { id: emailId },
        relations: ['sender'],
      });
      if (!email) throw new BadRequestException('No email found');
      await this.sendEmailService.sendEmail(
        email?.sender?.email,
        body,
        userDetail,
      );
      const emailReply = await this.saveEmailReply(userDetail, email, body);
      response = { error: false, data: emailReply };
      return response;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async saveEmailReply(userDetail: User, email: Email, body: string) {
    const emailReply = new EmailReply();
    emailReply.body = body;
    emailReply.sender = email.sender;
    emailReply.receiver = userDetail;
    emailReply.email = email;
    const reply = await this.replyRepository.save(emailReply);
    return {
      id: reply.id,
      body: reply.body,
      sentAt: reply.sentAt,
      sender: {
        id: reply.sender.id,
        name: `${reply.sender.firstName} ${reply.sender.lastName}`,
        email: await this.obscureSenderEmail(email.sender.email),
      },
    };
  }

  async isEmailAlreadyReplied(emailId: string) {
    let response = false;
    try {
      let emailReply = await this.replyRepository.find({
        where: { email: { id: emailId } },
      });
      if (emailReply.length > 0) {
        response = true;
      }
      return response;
    } catch (error) {
      throw new BadRequestException('No email found');
    }
  }

  async prepareResponseData(emailList: any) {
    if (emailList.length > 0) {
      emailList.forEach(async (email) => {
        delete email.sender.password;
        delete email.sender.createdAt;
        delete email.sender.updatedAt;
        delete email.createdAt;
        delete email.updatedAt;
        email.sender.name = `${email.sender.firstName} ${email.sender.lastName}`;
        email.sender.email = await this.obscureSenderEmail(email.sender.email);
      });
    }
    return emailList;
  }

  async obscureSenderEmail(email: string) {
    if (email) {
      const [username, domain] = email.split('@');
      const obscuredUsername = `${username[0]}***${
        username[username.length - 1]
      }`;
      const obscuredEmail = `${obscuredUsername}@${domain}`;
      email = obscuredEmail;
    }
    return email;
  }
}
