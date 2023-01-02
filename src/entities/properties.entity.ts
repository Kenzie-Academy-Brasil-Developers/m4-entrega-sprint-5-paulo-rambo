import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToOne,
    OneToMany,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn
} from "typeorm";
import Addresses from "./addresses.entity";
import Categories from "./categories.entity";
import SchedulesUsersProperties from "./schedules_user_properties.entity";

@Entity ("properties")
class Properties{

    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Column({default: false})
    sold:boolean

    @Column({type: 'decimal', precision: 12, scale: 2, default:0})
    value: number

    @Column()
    size: number

    @CreateDateColumn()
    createdAt: Date

    @CreateDateColumn()
    @UpdateDateColumn()
    updatedAt: Date

    @OneToOne(() => Addresses)
    @JoinColumn()
    address: Addresses;

    @ManyToOne(() => Categories, (categories) => categories.properties)
    category: Categories

    @OneToMany(() => SchedulesUsersProperties, schedules_users_properties => schedules_users_properties.properties)
    schedules_users_properties: SchedulesUsersProperties[]
}

export default Properties