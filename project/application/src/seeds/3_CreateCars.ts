import {Factory, Seeder} from 'typeorm-seeding';
import {Connection, getManager} from 'typeorm';
import {Car} from '../entities/Car';
import {Type} from '../entities/Type';
import {Period} from '../entities/Period';
 
export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const noResident = await getManager().getRepository(Type).findOne(1);
    const resident = await getManager().getRepository(Type).findOne(2);
    const oficial = await getManager().getRepository(Type).findOne(3);
    const period = await getManager().getRepository(Period).findOne(1);

    await connection
      .createQueryBuilder()
      .insert()
      .into(Car)
      .values([
        { licensePlate: 'ABC123', type: noResident},
        { licensePlate: 'XYZ789', type: resident },
        { licensePlate: 'MNO456', type: oficial },
      ])
      .execute();
  }
}