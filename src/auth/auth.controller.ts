import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import {authRequest, loginResponse, registerResponse} from "./dto/interfaces";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() registerDto: authRequest): Promise<registerResponse> {
    return await this.authService.register(
        registerDto.username,
        registerDto.password,
    );
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signInDto: authRequest): Promise<loginResponse> {
    return await this.authService.login(signInDto.username, signInDto.password);
  }
}
