import { IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";
import { User } from "../entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{
    @ApiProperty({
        default: "user@gmail.com"
    })
    @IsEmail()
    userEmail: string;
    @ApiProperty({
        default: "9825975"
    })
    @IsString()
    @MinLength(8)
    userPassword: string;
    @ApiProperty({
        default: "Client"
    })
    @IsOptional()
    @IsIn(["Admin", "Client"])
    userRoles: string[];
    @IsString()
    userName: string;
    @IsString()
    userLastName: string;
}