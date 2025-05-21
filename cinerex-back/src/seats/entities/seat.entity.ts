import { Room } from "src/rooms/entities/room.entity";
import { Ticket } from "src/tickets/entities/ticket.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Seat{
    @PrimaryGeneratedColumn('uuid')
    seatId: string;
    @Column('text')
    seatRow: string;
    @Column('int')
    seatNumber: number;

    @ManyToOne(() => Room, (room) => room.seats)
    room: Room;

    @OneToMany(() => Ticket, (ticket) => ticket.seat)
    tickets: Ticket[];
}