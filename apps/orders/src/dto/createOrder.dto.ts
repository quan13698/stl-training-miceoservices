import { IsString, IsNotEmpty, IsPositive, IsOptional } from "class-validator";

export class createOrderDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsPositive()
    price: number

    @IsString()
    phoneNumber: string

    @IsString()
    @IsOptional()
    status: string
} 