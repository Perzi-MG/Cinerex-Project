import { IsArray, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateShowtimeDto{
    @IsString()
    showtimeDate: string;
    @IsNumber()
    price: number;
    @IsString()
    movieId: string;
    @IsOptional()
    @IsArray()
    ocupiedSeats?: string[]
    @IsNumber()
    roomNumber: number;
}