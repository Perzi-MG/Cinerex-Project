import { IsEmail, IsString } from "class-validator";

export class CreateClientDto {
    @IsString()
    clientId: string;
    @IsString()
    clientName: string;
    @IsString()
    clientLastName: string;
    @IsEmail()
    clientEmail: string;
    
}