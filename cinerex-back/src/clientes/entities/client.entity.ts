import { User } from "src/auth/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client {
    @PrimaryGeneratedColumn('uuid')
    clientId: string;
    @Column('text')
    clientName: string;
    @Column('text')
    clientLastName: string;
    @Column('text', {
        unique: true
    })
    clientEmail: string
    @OneToOne(() => User)
    @JoinColumn({
        name: "userId"
    })
    user: User;
}