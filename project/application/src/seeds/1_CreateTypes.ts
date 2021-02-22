import {Factory, Seeder} from 'typeorm-seeding';
import {Connection} from 'typeorm';
import {Type} from '../entities/Type';
 
export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Type)
      .values([
        { name: 'No Residente', amount: 0.5 },
        { name: 'Residente', amount: 0.05 },
        { name: 'Oficial', amount: 0.0 },
      ])
      .execute()
  }
}