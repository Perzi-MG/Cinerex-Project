import { Movie } from "src/movies/entities/movie.entity";
import { Ticket } from "src/tickets/entities/ticket.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Showtime{
    @PrimaryGeneratedColumn('uuid')
    showtimeId: string;
    @Column('date')
    showtimeDate: string;
    @Column('text')
    price: string;
    @Column('simple-array', {nullable: true})
    ocupiedSeats?: string[];
    @Column('text')
    roomNumber: string;
    @Column('text')
    movieId: string;
    @OneToMany(() => Ticket, (ticket) => ticket.showtime)
    tickets?: Ticket[];
    @ManyToOne(() => Movie, (movie) => movie.showtimes)
    @JoinColumn({
        name: 'movieId'
    })
    movie: Movie | string;
}