import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user: User = await this.usersService.findByUsername(username);

    const passwordIsGood: boolean = await user.validatePassword(password);

    if (!passwordIsGood) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async register(username: string, password: string) {
    const user = await this.usersService.create(username, password);
    if (user) {
      return {
        id: user.id,
        username: user.username,
        role: user.role,
      };
    }
    throw new Error('An error occured during user registration.');
  }
}
