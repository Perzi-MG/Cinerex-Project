import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTicketDto{
    @IsString()
    seat: string;
    @IsString()
    showtimeId: string;
    @IsOptional()
    @IsString()
    userId?: string;
    @IsString()
    movieTittle: string;
    @IsString()
    showtimeDate: string;
    @IsNumber()
    room: number;
}