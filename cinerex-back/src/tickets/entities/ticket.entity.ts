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
    showtime: Showtime;

    @Column()
    showtimeId: string;

}