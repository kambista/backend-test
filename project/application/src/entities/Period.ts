import {Column, Entity, OneToMany, PrimaryGeneratedColumn, getManager} from "typeorm";
import {Stay} from "./Stay";

@Entity()
export class Period {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    month: number;

    @Column()
    year: number;

    @OneToMany(() => Stay, stay => stay.period, {lazy: true})
    staies: Promise<Stay[]>;

    public static async init() {
        const repository = getManager().getRepository(Period);
        const date = new Date();
        const newPeriod = repository.create();
        newPeriod.date = date;
        newPeriod.month = date.getMonth() + 1;
        newPeriod.year = date.getFullYear();
        return await repository.save(newPeriod);
    }

    public static async current() {
        const repository = getManager().getRepository(Period);
        const date = new Date();
        return await repository.findOne({
            where: {"month": date.getMonth() + 1, "year": date.getFullYear()}
        });
    }
}