import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateRoomDto {
    @IsString()
    @MaxLength(20)
    roomName: string;
    @IsNumber()
    roomCapacity: number;
    @IsString()
    @IsOptional()
    roomType?: string;
}