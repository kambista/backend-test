import { Module } from '@nestjs/common';
import { EstacionamientoModule } from './modules/estacionamiento/estacionamiento.module';

@Module({
  imports: [EstacionamientoModule],
})
export class AppModule {}
