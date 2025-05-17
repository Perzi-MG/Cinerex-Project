import { User } from "src/auth/entities/user.entity";
import { Seat } from "src/seats/entities/seat.entity";
import { Showtime } from "src/showtimes/entities/showtime.entity";
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Index(['showtime', 'seat'], {unique: true})
@Entity()
export class Ticket{
    @PrimaryGeneratedColumn('uuid')
    ticketId: string;

    @ManyToOne(() => Showtime, (showtime) => showtime.tickets)
    showtime: Showtime;

    @ManyToOne(() => Seat, (seat) => seat.tickets)
    seat: Seat;

    @ManyToOne(() => User, (user) => user.tickets, {nullable: true})
    user: User;

}