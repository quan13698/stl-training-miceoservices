import { AbstractRepository } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { extend } from 'joi';
import { Connection, Model } from 'mongoose';
import { User } from './schema/user.schema';
@Injectable()
export class UsersRepository extends AbstractRepository<User> {
  protected readonly logger = new this.logger(UsersRepository.name);

  constructor(
    @InjectModel(User.name) userModel: Model<User>,
    @InjectConnection() connection: Connection,
  ) {
    super(userModel, connection);
  }
}
