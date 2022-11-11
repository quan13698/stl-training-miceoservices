import { Injectable, BadRequestException } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { UsersRepository } from './user.repository';
import * as bcrypt from 'bcrypt'
import { CreateUserDTO } from '../dto/createUser.sto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async checkLogin(loginDto: LoginDto) {
    const {email, password} = loginDto;
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new BadRequestException(`cannot find user with email = ${email}`);
    }
    if(await bcrypt.compare(password, user.password)){
        return user
    }else{
        throw new BadRequestException('invalid cridential')
    }
  }

  async createUser(createUserDTO: CreateUserDTO) {
    const userInformation = {
        email: createUserDTO.email,
        password: await bcrypt.hash(createUserDTO.password, 10)
    }
    const newUser = await this.userRepository.create(userInformation);
    return newUser
  }

  async getUsers() {
    return this.userRepository.find({})
  }
}
