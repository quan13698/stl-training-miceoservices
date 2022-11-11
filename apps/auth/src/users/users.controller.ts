import { Controller, Post, Body, Get } from "@nestjs/common";
import { async } from "rxjs";
import { CreateUserDTO } from "../dto/createUser.sto";
import { UsersService } from "./users.service";

@Controller('auth')
export class UsersController {
    constructor(
        private usersService: UsersService
    ){}

    @Post()
    async createUser(@Body() createUserDTO: CreateUserDTO) {
        return this.usersService.createUser(createUserDTO)
    }

    @Get('users')
    async getUsers() {
        
        return this.usersService.getUsers()
    }
}