import { BadGatewayException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SES } from 'aws-sdk';
import User from 'src/entities/user.entity';

@Injectable()
export class SendEmailService {
  constructor(private readonly configService: ConfigService) {}

  async sendEmail(sendTo: string, body: string, userDetail: User) {
    const ses = new SES({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
      region: this.configService.get('AWS_REGION'),
      endpoint: this.configService.get('LOCAL_STACK_URL'),
      s3ForcePathStyle: true,
    });

    const params = {
      Destination: {
        ToAddresses: [sendTo],
      },
      Message: {
        Body: {
          Text: {
            Data: body,
          },
        },
        Subject: { Data: '' },
      },
      Source: userDetail.email,
    };

    try {
      const result = await ses.sendEmail(params).promise();
      console.log('Email sent:', result);
    } catch (error) {
      console.log(error);
      throw new BadGatewayException(error.message);
    }
  }
}
