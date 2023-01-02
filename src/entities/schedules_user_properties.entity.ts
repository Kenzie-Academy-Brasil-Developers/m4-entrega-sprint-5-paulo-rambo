import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";
import Properties from "./properties.entity";


@Entity ('schedules_users_properties')
class Schedules_users_properties{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type:'date'})
    date: string

    @Column({type: 'time'})
    hour: string

    @ManyToOne(()=> User, (users) => users.schedules_users_properties)
    users: User

    @ManyToOne(()=> Properties, properties => properties.schedules_users_properties)
    properties: Properties

}

export default Schedules_users_properties