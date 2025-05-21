import { Showtime } from "src/showtimes/entities/showtime.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movie{

    @PrimaryGeneratedColumn('uuid')
    movieId: string;
    @Column('text')
    movieTitle: string;
    @Column('text')
    movieDescription: string;
    @Column('int')
    movieDuration: number;
    @Column('text')
    movieRating: string;
    @Column('text')
    moviePhoto: string;
    @Column('boolean')
    isActive: string;

    @OneToMany(() => Showtime, (showtime) => showtime.movie)
    showtimes: Showtime[];

}