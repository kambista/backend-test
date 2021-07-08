import { Body, Controller, Delete, Get, Patch, Post, Put, Param } from '@nestjs/common';
import { EntradaDto, EstanciaDto, SalidaDto, VehiculoDto } from '../../dto/index'

import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { EstacionamientoService } from './estacionamiento.service';

@Controller()
export class EstacionamientoController {
  constructor(
    private readonly estacionamientoService: EstacionamientoService,
  ) { }


  @Post('/salida')
  postRegistrarSalida(
    @Body() dto: SalidaDto,
  ): Promise<string> {
    return this.estacionamientoService.postRegistrarSalida(dto);
  }
  @Post('/entrada')
  postRegistrarEntrada(
    @Body() dto: EntradaDto,
  ): Promise<string> {
    return this.estacionamientoService.postRegistrarEntrada(dto);
  }
  @Post('/vehiculo')
  postAltaVehiculo(
    @Body() dto: VehiculoDto,
  ): Promise<string> {
    return this.estacionamientoService.postAltaVehiculo(dto);
  }

  @Get('/estadocuenta/:placa')
  getEstadoCuentaVehiculo(
    @Param() params: any,
  ): Promise<string> {
    return this.estacionamientoService.getEstadoCuentaVehiculo(params.placa);
  }
  @Get('/estadocuenta/:placa/:periodo')
  getEstadoCuentaVehiculoPeriodo(
    @Param() params: any,
  ): Promise<string> {
    return this.estacionamientoService.getEstadoCuentaVehiculoPeriodo(params);
  }

  @Get('/test')
  getTest(
    @Param() params: any,
  ): number {

    let x = 10 ;
    let y = 20 ;

    return x + y;
  }
  /*
  @ApiOkResponse({ description: 'ApiOkResponse' })
  @ApiConflictResponse({ description: 'ApiConflictResponse' })
  @ApiNoContentResponse({ description: 'ApiNoContentResponse' })
  @ApiBadRequestResponse({ description: 'ApiBadRequestResponse' })
  @Get('/getDemoEstacionamiento')
  getDemo(): string {
    return this.estacionamientoService.getDemo();
  }
  @Post('/postDemo')
  postDemo(): string {
    return this.estacionamientoService.postDemo();
  }
  @Put('/putDemo')
  putDemo(): string {
    return this.estacionamientoService.putDemo();
  }
  @Delete('/deleteDemo')
  deleteDemo(): string {
    return this.estacionamientoService.deleteDemo();
  }
  @Patch('/patchDemo')
  patchDemo(): string {
    return this.estacionamientoService.patchDemo();
  }
  */
}
