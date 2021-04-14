import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
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
}
