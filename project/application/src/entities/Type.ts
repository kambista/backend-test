import {Column, Entity, OneToMany, PrimaryGeneratedColumn, getManager} from "typeorm";
import {Car} from "./Car";

@Entity()
export class Type {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({type: "float"})
    amount: number;

    @OneToMany(() => Car, car => car.type)
    cars: Car[];

    public static async nonResident() {
        const typeRepository = getManager().getRepository(Type);
        return await typeRepository.findOne(1);
    }

    public static async resident() {
        const typeRepository = getManager().getRepository(Type);
        return await typeRepository.findOne(2);
    }

    public static async oficial() {
        const typeRepository = getManager().getRepository(Type);
        return await typeRepository.findOne(3);
    }
}