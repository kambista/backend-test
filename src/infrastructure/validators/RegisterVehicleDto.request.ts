import { IsString, IsNumberString, Length } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { VEHICLE_TYPE } from '../../domain/shared/consts';

export class RegisterVehicletDto {
	@ApiProperty({ example: '1', description: 'id Tipo de Vehiculo', enum: VEHICLE_TYPE })
	@Type(() => Number)
	idVehicleType: number;

	@ApiProperty({ example: 'XSEE11', description: 'Placa de Vehiculo' })
	@IsString()
	@Length(6, 6)
	@Transform(({ obj, key, value }) => String(value).toUpperCase())
	licensePlate: string;
}
