import {
  Injectable,
  Logger,
} from '@nestjs/common';
import { EntradaDto, EstanciaDto, SalidaDto, VehiculoDto } from '../../dto/index'

import { DAOFactory } from 'src/connection/DAOFactory';

import {
  difInMinutes
} from '../../function/commons';

@Injectable()
export class EstacionamientoService {
  private logger: Logger;
  private connection: DAOFactory;

  constructor() {
    this.logger = new Logger('estacionamiento-service');
    this.connection = new DAOFactory();
  }
  getDemo(): string {
    this.logger.log('getDemo');
    return 'getDemoX';
  }
  postDemo(): string {
    return 'postDemoX';
  }
  putDemo(): string {
    return 'putDemoX';
  }
  deleteDemo(): string {
    return 'deleteDemoX';
  }
  patchDemo(): string {
    return 'patchDemoX';
  }

  async postAltaVehiculo(dto: VehiculoDto): Promise<string> {

    let tarifa: number;


    if (dto.tipo == 'oficial')
      tarifa = 0;
    else if (dto.tipo == 'residente')
      tarifa = 0.05;
    else
      tarifa = 0.50;

    dto.tarifa = tarifa;

    const db = await this.connection.getDAOFactory(5);
    const resultado = await db.collection("vehiculos").insertOne(dto)
    return 'postAltaVehiculo';
  }
  async postRegistrarEntrada(dto: EntradaDto): Promise<string> {

    const db = await this.connection.getDAOFactory(5);
    const query = {
      'placa': dto.placa
    };
    const options = {
      projection: {
        _id: 0,
        tarifa: 1,
        tipo: 1
      },
      sort: { _id: -1 },
      limit: 1
    };

    const vehiculo = await db.collection("vehiculos").findOne(query, options);

    const estancia = {

      placa: dto.placa,
      fechaentrada: new Date(Date.now()),
      estado: true,
      tarifa: (!vehiculo) ? 0.50 : vehiculo.tarifa,
      tipo: (!vehiculo) ? "libre" : vehiculo.tipo,
      facturado: false

    };

    const registro = await db.collection("estancias").insertOne(estancia)

    return 'OK';

  }
  async postRegistrarSalida(dto: SalidaDto): Promise<string> {

    const db = await this.connection.getDAOFactory(5);
    const query = {
      $and: [
        { 'placa': dto.placa },
        { 'estado': true }
      ]
    };
    const options = {
      projection: {
        _id: 0,
      },
      sort: { _id: -1 },
      limit: 1
    };

    const estancia = await db.collection("estancias").findOne(query, options);

    const fechasalida = new Date(Date.now());
    const facturado = (estancia.tipo == 'residente') ? false : true;
    const minutos = difInMinutes(estancia.fechaentrada, fechasalida);


    const importefacturado = minutos * estancia.tarifa;

    const campos = {
      estado: false,
      fechasalida: fechasalida,
      facturado: facturado,
      importefacturado: importefacturado,
      minutos: minutos
    }

    const resultado = await db.collection("estancias").updateOne(query, { $set: campos })

    return 'OK';

  }
  async getVehiculo(placa): Promise<any> {

    const db = await this.connection.getDAOFactory(5);
    const query = {
      placa: placa,
    };
    const options = {
      projection: {
        tarifa: 1,
        tipo: 1
      },
      limit: 1
    };
    const data = await db.collection("vehiculos").find(query, options).toArray();

    return data;

  }
  async getEstadoCuentaVehiculo(placa): Promise<any> {

    const db = await this.connection.getDAOFactory(5);
    const query = {
      placa: placa,
    };
    const options = {
      projection: {
      }
    };
    const data = await db.collection("estancias").find(query, options).toArray();

    if (data[0].tipo == 'libre') {

      return {
        minutos: data[0].minutos,
        importefacturado: data[0].importefacturado
      };

    }

    let totalMinutos = 0;
    let totalImporte = 0;
    let totalEstancias = data.length;

    let periodo = Array()

    for (let i = 0; i < data.length; i++) {

      totalMinutos += data[i].minutos;
      totalImporte += data[i].importefacturado;

      if (periodo.length == 0) {
        periodo.push({ periodo: (data[i].fechasalida.getMonth() + 1) + '-' + (data[i].fechasalida.getYear() + 1900) })
      }
    }

    return {

      placa: data[0].placa,
      tipo: data[0].tipo,
      minutos: totalMinutos,
      importe: totalImporte,
      estancias: totalEstancias

    };


  }
  async getEstadoCuentaVehiculoPeriodo(params): Promise<any> {

    const db = await this.connection.getDAOFactory(5);
    const query = {
      placa: params.placa
    };
    const options = {
      projection: {
      }
    };
    const data = await db.collection("estancias").find(query, options).toArray();

    let totalMinutos = 0;
    let totalImporte = 0;
    let totalEstancias = data.length;

    for (let i = 0; i < data.length; i++) {


      if ((data[i].fechasalida.getMonth() + 1) + '-' + (data[i].fechasalida.getYear() + 1900) == params.periodo) {
        totalMinutos += data[i].minutos;
        totalImporte += data[i].importefacturado;
      }
    }

    let mm = params.periodo.split("-")[0];
    let yy = params.periodo.split("-")[1];

    return {

      placa: data[0].placa,
      tipo: data[0].tipo,
      minutos: totalMinutos,
      importe: totalImporte,
      estancias: totalEstancias,
      periodo:params.periodo ,
      mes:mm,
      año:yy

    };


  }
}
