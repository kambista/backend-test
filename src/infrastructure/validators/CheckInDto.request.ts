import { IsString, IsNumberString, Length } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { VEHICLE_TYPE } from '../../domain/shared/consts';

export class CheckInDto {
	@ApiProperty({ example: 'XSEE11', description: 'Placa de Vehiculo a Registrar' })
	@IsString()
	@Length(6, 6)
	@Transform(({ obj, key, value }) => String(value).toUpperCase())
	licensePlate: string;
}
