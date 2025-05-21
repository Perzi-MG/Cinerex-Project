import { IsNumber } from "class-validator";

export class CreateTicketDto{
    @IsNumber()
    showtimeId?: number | undefined;

    @IsNumber()
    seatId?: number | undefined;
    
}