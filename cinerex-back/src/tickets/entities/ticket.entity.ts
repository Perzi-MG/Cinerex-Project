import { User } from "src/auth/entities/user.entity";
import { Showtime } from "src/showtimes/entities/showtime.entity";
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn('uuid')
    ticketId: string;
    @Column('text')
    seat: string;
    @ManyToOne(() => Showtime, (showtime) => showtime.tickets)
    @JoinColumn({
        name: 'showtimeId'
    })
    showtime: Showtime | string;
    @Column('text')
    showtimeId: string;
    @ManyToOne(() => User, (user) => user.tickets)
    @JoinColumn({
        name: "userId"
    })
    user?: User | string;
    @Column('text')
    userId: string;
    @Column('text')
    movieTittle: string;
    @Column('date')
    showtimeDate: string;
    @Column('int')
    room: number;
}