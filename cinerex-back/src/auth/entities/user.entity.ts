import { Ticket } from "src/tickets/entities/ticket.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string;
    @Column('text')
    userName: string;
    @Column('text', {
        unique: true
    })
    userEmail: string;
    @Column('text')
    userPassword: string;
    @Column('simple-array', {
        default: "Employee"
    })
    userRoles: string[];

    @OneToMany(() => Ticket, (ticket) => ticket.user)
    tickets: Ticket[];
}