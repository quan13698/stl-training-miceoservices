import { Controller, Get, Post, Res, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { User } from './users/schema/user.schema';
import { UsersRepository } from './users/user.repository';
import { UsersService } from './users/users.service';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UsersRepository,
    private readonly userService: UsersService
  ) {}

  @Post('login')
  async login(
    @Body() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    response.send(user);
  }
}
