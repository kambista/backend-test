import { CustomExceptionFilter } from '../filters/exception.filter';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, Put, UseFilters } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ParkingService } from '../../application/user-cases/parking.service';
import { Parking } from '../../domain/entities/parking';
import { CheckInDto } from '../validators/CheckInDto.request';

@Controller('parking')
@UseFilters(CustomExceptionFilter)
@ApiTags('Parking')
export class ParkingController {
	private readonly logger = new Logger('ParkingController');
	constructor(
		private readonly parkingService: ParkingService,
	) {}
	

	@HttpCode(HttpStatus.CREATED)
	@ApiOkResponse({ description: 'Registro de Inicio de Parqueo' })
	@Post('/checkin')
	async checkin(@Body() body: CheckInDto): Promise<Parking> {
		return this.parkingService.checkin( body.licensePlate);
	}

	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({ description: 'Listado de Parqueos' })
	@Get()
	async getParkings(): Promise<Array<Parking>> {
		return this.parkingService.getParkingWithDate( Date());
	}
	
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({ description: 'Inicio de Mes' })
	@Post('/start-month')
	async startMonth(): Promise<void> {
		return this.parkingService.startMonth();
	}

	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({ description: 'Registro de Salida de Parqueo' })
	@Put('/:id/checkout')
	async checkout(@Param("id") id: string): Promise<Parking> {
		return this.parkingService.checkout( id);
	}
}
