import {Factory, Seeder} from 'typeorm-seeding';
import {Connection} from 'typeorm';
import {Period} from '../entities/Period';
 
export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const now = new Date();

    await connection
      .createQueryBuilder()
      .insert()
      .into(Period)
      .values([
        { date: now, month: now.getMonth() + 1, year: now.getFullYear()},
      ])
      .execute()
  }
}