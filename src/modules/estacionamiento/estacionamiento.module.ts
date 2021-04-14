import { Module } from '@nestjs/common';
import { EstacionamientoController } from './estacionamiento.controllers';
import { EstacionamientoService } from './estacionamiento.service';

@Module({
  controllers: [EstacionamientoController],
  providers: [EstacionamientoService]
})
export class EstacionamientoModule {}
