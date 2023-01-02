import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from "typeorm";
import Properties from "./properties.entity";

@Entity ("addresses")
class Addresses{

    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column()
    district:string

    @Column({length:8})
    zipCode: string

    @Column({nullable:true})
    number: string

    @Column()
    city: string

    @Column({length:2})
    state: string

    /* @OneToOne(() => Properties)
    @JoinColumn()
    properties: Properties; */
}

export default Addresses