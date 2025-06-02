import { IsBoolean, IsNumber, IsObject, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateMovieDto {

    @IsString()
    @MaxLength(50)
    movieTitle: string;
    @IsString()
    movieDescription: string;
    @IsString()
    movieDuration: string;
    @IsString()
    movieRating: string;
    @IsOptional()
    moviePhoto: string;
    @IsString()
    isActive: string;

}