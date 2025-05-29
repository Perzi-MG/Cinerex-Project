import { Movie } from "src/movies/entities/movie.entity";
import { Room } from "src/rooms/entities/room.entity";
import { Ticket } from "src/tickets/entities/ticket.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(() => Movie, (movie) => movie.showtimes)
    movie: Movie;

    @ManyToOne(() => Room, (room) => room.showtimes)
    room?: Room;

    @OneToMany(() => Ticket, (ticket) => ticket.showtime)
    tickets?: Ticket[];
}