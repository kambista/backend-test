import {Entity, getManager, PrimaryColumn, ManyToOne, OneToMany} from "typeorm";
import {Type} from "./Type";
import {Stay} from "./Stay";

@Entity()
export class Car {
    @PrimaryColumn()
    licensePlate: string;

    @ManyToOne(() => Type, type => type.cars, {eager: true})
    type: Type;

    @OneToMany(() => Stay, stay => stay.car, {lazy: true})
    staies: Promise<Stay[]>;

    public static async findOrCreate(licensePlate: string) {
        const repository = getManager().getRepository(Car);
        const type = await Type.nonResident();
        const car = repository.create();
        car.licensePlate = licensePlate;
        car.type = type!;
        return await repository.save(car);
    }

    public static async upResident(car: Car) {
        const repository = getManager().getRepository(Car);
        const type = await Type.resident();
        car.type = type!;
        return await repository.save(car);
    }

    public static async upOficial(car: Car) {
        const repository = getManager().getRepository(Car);
        const type = await Type.oficial();
        car.type = type!;
        return await repository.save(car);
    }
}