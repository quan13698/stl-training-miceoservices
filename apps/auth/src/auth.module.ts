import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as  Joi from 'joi';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from './users/user.repository';
import { DatabaseModule, RmqModule } from '@app/common';

@Module({
  imports: [
    UsersModule,
    DatabaseModule, 
    RmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        JWT_EXPIRES: Joi.number().required()
      }),
      envFilePath: './apps/auth/.env'
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
