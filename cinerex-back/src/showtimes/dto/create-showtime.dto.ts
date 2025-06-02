import { IsArray, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateShowtimeDto{
    @IsString()
    showtimeDate: string;
    @IsString()
    price: string;
    @IsOptional()
    @IsArray()
    ocupiedSeats?: string[]
    @IsString()
    roomNumber: string;
    @IsString()
    movieId: string;
}