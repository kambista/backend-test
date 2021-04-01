import { generateReportDebtResident } from './../reports/generateReport';
import { CustomExceptionFilter } from '../filters/exception.filter';
import {
	Body,
	Controller,
	Get,
	Logger,
	Post,
	UseFilters,
	BadRequestException,
	Res,
	Query,
	HttpCode,
	HttpStatus
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { VehicleTypeService } from '../../application/user-cases/vehicle-type.service';
import { VehicleService } from '../../application/user-cases/vehicle.service';
import { Vehicle } from '../../domain/entities/vehicle';
import { Response } from 'express';
import { RegisterVehicletDto } from '../validators/RegisterVehicleDto.request';
import { ReportDebtResidentDto } from '../validators/ReportDebtResidentDto.request';

@Controller('vehicles')
@UseFilters(CustomExceptionFilter)
@ApiTags('Vehicle')
export class VehicleController {
	private readonly logger = new Logger('VehicleController');
	constructor(
		private readonly vehicleService: VehicleService,
		private readonly vehicleTypeService: VehicleTypeService
	) {}

	@HttpCode(HttpStatus.CREATED)
	@ApiOkResponse({ description: 'Registra Vehiculos Oficiales y  Residentes ' })
	@Post()
	async create(@Body() createVehicleDto: RegisterVehicletDto): Promise<Vehicle> {
		try {
			const vehicleType = await this.vehicleTypeService.getVehicleTypeWithId(createVehicleDto.idVehicleType);
			if (!vehicleType) throw new BadRequestException('Tipo de Vehiculo invalido');

			const vehicle: Vehicle = {
				vehicleType: vehicleType,
				licensePlate: createVehicleDto.licensePlate
			};
			return this.vehicleService.registerVehicle(vehicle);
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}

	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({
		description: 'Lista de Vehiculos Registrados'
	})
	@Get()
	async getAll(): Promise<Array<Vehicle>> {
		return this.vehicleService.getVehicles();
	}

	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({ description: 'Reporte de deuda de vehiculos Residentes' })
	@Get('/debts')
	async getCurrentResidentDebts(@Query() query: ReportDebtResidentDto, @Res() res: Response) {
		const data = await this.vehicleService.getCurrentResidentDebts();
		res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
		res.setHeader('Content-Disposition', 'attachment; filename=' + query.fileName + '.xlsx');

		generateReportDebtResident(query.fileName, data)
			.write(res)
			.then(() => res.end())
			.catch((error) => console.log(error));
	}
}
