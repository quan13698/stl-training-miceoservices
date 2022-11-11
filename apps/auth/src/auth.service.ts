import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from './users/schema/user.schema';
import { UsersService } from './users/users.service';

interface TokenPayload {
  userId: string;
}
@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async login(user: User, res: Response) {
    const payload: TokenPayload = {
      userId: user._id.toHexString(),
    };
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRES')
    )
    const token = this.jwtService.sign(payload);
    res.cookie('Authentication', token, {
      httpOnly: true,
      expires
    })
  }

  logout(res: Response) {
    res.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date()
    })
  }
}
