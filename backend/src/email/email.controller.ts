import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { request } from 'http';
import { EmailReplyDto } from './dto/reply.dto';

@Controller('emails')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getReceivedEmailList(@Request() request) {
    return await this.emailService.getUserReceivedEmails(request?.user);
  }

  @Get(':emailId')
  @UseGuards(JwtAuthGuard)
  async getEmailDetailById(
    @Request() request,
    @Param('emailId') emailId: string,
  ) {
    return await this.emailService.getEmailById(emailId);
  }

  @Post(':emailId/reply')
  @UseGuards(JwtAuthGuard)
  async sendEmailReply(
    @Request() request,
    @Body() emailReply: EmailReplyDto,
    @Param('emailId') emailId: string,
  ) {
    return await this.emailService.sendEmailReply(
      request?.user,
      emailReply.body,
      emailId
    );
  }
}
