import { IsArray, IsDate, IsNumber, IsString } from "class-validator";

export class CreateShowtimeDto{
    @IsString()
    showtimeDate: string;
    @IsNumber()
    price: number;
    @IsString()
    movieId: string;
    @IsArray()
    ocupiedSeat?: string[]
}