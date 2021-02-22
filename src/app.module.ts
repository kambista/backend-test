import { VehicleTypeController } from './infrastructure/controllers/vehicle-type.controller';
import { Module } from '@nestjs/common';
import { VehicleTypeService } from './application/user-cases/vehicle-type.service';
import { VehicleTypeMemoryRepository } from './infrastructure/persistence/memory/repositories/vehicle-type-memory-repository';
import { urlMongo } from './infrastructure/config';
import { VehicleService } from './application/user-cases/vehicle.service';
import { VehicleMongoRepository } from './infrastructure/persistence/mongodb/repositories/vehicle-mongo-repository';
import { VehicleController } from './infrastructure/controllers/vehicle.controller';
import { ParkingMongoRepository } from './infrastructure/persistence/mongodb/repositories/parking-mongo-repository';
import { ParkingService } from './application/user-cases/parking.service';
import { ParkingController } from './infrastructure/controllers/parking.controller';

@Module({
	imports: [],
	controllers: [ VehicleTypeController, VehicleController, ParkingController ],
	providers: [
		VehicleTypeMemoryRepository,
		VehicleTypeService,
		VehicleService,
		ParkingService,
		{
			provide: 'URL_CONNECTION',
			useValue: urlMongo
		},
		{
			provide: 'PARKING_REPOSITORY',
			useClass: ParkingMongoRepository
		},
		{
			provide: 'TYPE_REPOSITORY',
			useExisting: VehicleTypeMemoryRepository  // SINGLETON
		},
		{
			provide: 'VEHICLE_REPOSITORY',
			useClass: VehicleMongoRepository
		}
	]
})
export class AppModule {}
