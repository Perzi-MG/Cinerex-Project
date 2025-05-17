import { Seat } from "src/seats/entities/seat.entity";
import { Showtime } from "src/showtimes/entities/showtime.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Room{
    @PrimaryGeneratedColumn('uuid')
    roomId: string;
    @Column('text')
    roomName: string;
    @Column('number')
    roomCapacity: number;
    @Column('text')
    roomType: string;

    @OneToMany(() => Seat, (seat) => seat.room)
    seats: Seat[];

    @OneToMany(() => Showtime, (showtime) => showtime.room)
    showtimes: Showtime[];
}