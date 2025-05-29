import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateClientDto {
    @IsString()
    clientName: string;
    @IsString()
    clientLastName: string;
    @IsEmail()
    clientEmail: string;
}