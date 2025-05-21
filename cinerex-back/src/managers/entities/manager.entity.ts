import { User } from "src/auth/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Manager {

    @PrimaryGeneratedColumn('uuid')
    managerId: string;
    @Column('text')
    managerFullName: string;
    @Column('text', {
        unique: true
    })
    managerEmail: string;
    @Column('text')
    managerPhoneNumber: string;
    @OneToOne(() => User)
    @JoinColumn({
        name: "userId"
    })
    user: User

}
