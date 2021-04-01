import { IsString, IsNumberString, Length } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterVehicleTypeDto {
	@ApiProperty({ example: '5.1', description: 'Precio de parqueo por minuto' })
	@Type(() => Number)
	parkingPrice: number;

	@ApiProperty({ example: 'Visitantes', description: 'Nombre del Tipo de vehiculo' })
	@IsString()
	@Transform(({ obj, key, value }) => String(value).toUpperCase())
	name: string;
}
