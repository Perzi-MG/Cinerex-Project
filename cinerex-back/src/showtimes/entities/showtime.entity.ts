import { Movie } from "src/movies/entities/movie.entity";
import { Ticket } from "src/tickets/entities/ticket.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Showtime{
    @PrimaryGeneratedColumn('uuid')
    showtimeId: string;
    @Column('date')
    showtimeDate: string;
    @Column('int')
    price: number;
    @Column('simple-array', {nullable: true})
    ocupiedSeats?: string[];
    @Column('int')
    roomNumber: number;

    @ManyToOne(() => Movie, (movie) => movie.showtimes)
    @JoinColumn({
        name: 'movieId'
    })
    movie: Movie;

    @Column()
    movieId: string;

    @OneToMany(() => Ticket, (ticket) => ticket.showtime)
    tickets?: Ticket[];
}