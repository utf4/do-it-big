import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserDto } from './dto/users.dto';
import { PasswordService } from './password.service';
import { ConfigService } from '@nestjs/config';
import { IPayloadUserJwt, Token } from './dto/jwt.dto';
import { LoginDto } from './dto/login.dto';
import { SecurityConfig } from 'src/config/config.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(userDetail: UserDto) {
    try {
      const isExists = await this.usersService.findUser(userDetail.email);
      console.log(isExists);
      if (isExists)
        throw new UnprocessableEntityException(
          `User with email ${userDetail.email} already exists`,
        );
      const hashedPassword = await this.passwordService.hashPassword(
        userDetail.password,
      );
      return await this.usersService.createUser(userDetail, hashedPassword);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(payload: LoginDto) {
    let response = { error: false, data: {} };
    try {
      let user = await this.usersService.findUser(payload.email);
      if (!user) {
        throw new NotFoundException(
          `No user found against email: ${payload.email}`,
        );
      }
      const passwordValid = await this.passwordService.validatePassword(
        payload.password,
        user.password,
      );
      if (!passwordValid) {
        throw new BadRequestException('Invalid credentials provided');
      }
      const jwtToken = this.generateTokens({ userId: user.id });
      let { firstName, lastName, email } = user;
      let { accessToken } = jwtToken;
      response = {
        error: false,
        data: { firstName, lastName, email, accessToken },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return response;
  }

  private generateTokens(payload: { userId: string }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: { userId: string }): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { userId: string }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn,
    });
  }
}
