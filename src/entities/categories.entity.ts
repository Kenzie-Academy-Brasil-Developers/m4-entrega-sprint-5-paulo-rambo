import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from "typeorm";
import Properties from "./properties.entity";

@Entity ("categories")
class Categories{

    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({unique: true})
    name:string

    @OneToMany(() => Properties, (properties) => properties.category)
    properties: Properties[]

}

export default Categories