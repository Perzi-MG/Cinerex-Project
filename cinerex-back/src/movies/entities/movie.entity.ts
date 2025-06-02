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
    @Column('text')
    movieDuration: string;
    @Column('text')
    movieRating: string;
    @Column({
        type: 'text',
        nullable: true
    })
    moviePhoto: string;
    @Column('text')
    isActive: string;

    @OneToMany(() => Showtime, (showtime) => showtime.movie)
    showtimes: Showtime[];

}