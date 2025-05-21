import { IsDate, IsNumber } from "class-validator";

export class CreateShowtimeDto{
    @IsDate()
    showtimeDate: Date;
    @IsNumber()
    price: number;
}