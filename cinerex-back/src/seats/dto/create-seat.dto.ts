import { IsNumber, IsString } from "class-validator";

export class CreateSeatDto{

    @IsString()
    seatRow: string;
    @IsNumber()
    seatNumber: number;


}