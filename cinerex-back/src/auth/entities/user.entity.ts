import { Ticket } from "src/tickets/entities/ticket.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string;
    @Column('text', {
        unique: true
    })
    userEmail: string;
    @Column('text')
    userPassword: string;
    @Column('simple-array', {
        default: "Client"
    })
    userRoles: string[];
    @OneToMany(() => Ticket, (ticket) => ticket.user)
    tickets?: Ticket[];
    @Column('text')
    userName: string;
    @Column('text')
    userLastName: string;
}