import { IsNumber, IsString } from "class-validator";

export class CreateTicketDto{
    @IsString()
    seat: string;
    @IsString()
    showtimeId: string;
    
}