import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserDto } from './dto/users.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  async signup(@Body() user: UserDto) {
    return await this.authService.signUp(user);
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Body() userData: LoginDto) {
    return await this.authService.login(userData);
  }
}
