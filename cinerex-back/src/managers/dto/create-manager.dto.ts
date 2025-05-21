import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateManagerDto{
    @IsString()
    managerFullName: string;
    @IsString()
    @IsEmail()
    managerEmail: string;
    @IsString()
    @MaxLength(16)
    managerPhoneNumber: string;
}
