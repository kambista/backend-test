import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, getManager} from "typeorm";
import {Car} from "./Car";
import {Period} from "./Period";

@Entity()
export class Stay {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    entryDate: Date;

    @Column({nullable: true})
    exitDate: Date;

    @Column({type: "float", nullable: true})
    amount: number;

    @Column({nullable: true})
    time: number;

    @Column({default: false})
    finished: boolean;

    @ManyToOne(() => Car, car => car.staies, {eager: true})
    car: Car;

    @ManyToOne(() => Period, period => period.staies, {eager: true})
    period: Period;

    public static async create(period: Period, car: Car) {
        const repository = getManager().getRepository(Stay);
        const entryDate = new Date();
        const newStay = new Stay();
        newStay.entryDate = entryDate;
        newStay.period = period;
        newStay.car = car;
        return await repository.save(newStay);
    }

    public static async isStay(car: Car) {
        const repository = getManager().getRepository(Stay);
        return await repository.findOne({where: {"car": car, "finished": false}});
    }

    public static async registerExit(stay: Stay) {
        const repository = getManager().getRepository(Stay);
        const now = new Date();
        let time = Math.ceil(((now.getTime() - stay.entryDate.getTime()) / 1000) / 60).toFixed(2);
        stay.time = parseFloat(time);
        stay.amount = parseFloat(time) * stay.car.type.amount;
        stay.exitDate = now;
        stay.finished = true;
        return await repository.save(stay);
    }
}