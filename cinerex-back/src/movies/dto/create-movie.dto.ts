import { IsBoolean, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateMovieDto {

    @IsString()
    @MaxLength(50)
    movieTitle: string;
    @IsString()
    movieDescription: string;
    @IsNumber()
    movieDuration: number;
    @IsString()
    movieRating: string;
    @IsString()
    moviePhoto: string;
    @IsBoolean()
    isActive: string;

}