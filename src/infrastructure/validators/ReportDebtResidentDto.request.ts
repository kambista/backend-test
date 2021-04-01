import { IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ReportDebtResidentDto {
	@ApiProperty({ example: 'reporte_deudores' })
	@IsOptional()
	@Transform(({ obj, key, value }) => {
		if (value) value = String(value).replace(/\W/gi, '');
		return (obj[key] = value);
	})
	@IsString()
	fileName: string = 'reporte_deuda_residentes';
}
