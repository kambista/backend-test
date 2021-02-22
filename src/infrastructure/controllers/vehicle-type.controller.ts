import { CustomExceptionFilter } from './../filters/exception.filter';
import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Put, UseFilters } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { VehicleTypeService } from '../../application/user-cases/vehicle-type.service';
import { VehicleType } from '../../domain/entities/vehicle-type';
import { RegisterVehicleTypeDto } from '../validators/RegisterVehicleTypeDto';

@Controller('vehicles/type')
@UseFilters(CustomExceptionFilter)
@ApiTags('VehicleTypes')
export class VehicleTypeController {
	constructor(
		private readonly vehicleTypeService: VehicleTypeService,
	) {}

	@HttpCode(HttpStatus.CREATED)
	@ApiOkResponse({ description: 'Registro de nuevo Tipo de Vehiculo' })
	@Post()
	async create(@Body() vehicleType: RegisterVehicleTypeDto): Promise<VehicleType> {
		return this.vehicleTypeService.registerVehicleType( vehicleType);
	}

	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({ description: 'Lista de Tipos de Vehiculos existentes' })
	@Get()
	async getAll(): Promise<Array<VehicleType>> {
		return this.vehicleTypeService.getVehicleTypes();
	}

}
