import {
  //    Injectable,
  Logger,
} from '@nestjs/common';
import { MariaDbDAOFactory } from './MariaDbDAOFactory';
import { MongoDbDAOFactory } from './MongoDbDAOFactory';
import { OracleDAOFactory } from './OracleDAOFactory';
import { PostgreSqlDAOFactory } from './PostgreSqlDAOFactory';
import { SqlServerDAOFactory } from './SqlServerDAOFactory';

const POSTGRESQL: number = 1;
const ORACLE: number = 2;
const MARIADB: number = 3;
const SQLSERVER: number = 4;
const MONGODB: number = 5;

export class DAOFactory {
  private logger: Logger;

  constructor() {
    this.logger = new Logger('DAOFactory');
  }

  getDAOFactory(opc: number) {
    switch (opc) {
      case POSTGRESQL:
        return new PostgreSqlDAOFactory();
      case ORACLE:
        return new OracleDAOFactory();
      case MARIADB:
        return new MariaDbDAOFactory();
      case SQLSERVER:
        return new SqlServerDAOFactory();
      case MONGODB:
        return new MongoDbDAOFactory().getConnection();
      default:
        return null;
    }
  }
}
