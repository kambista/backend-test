import { Router } from 'express';
import vehicleControllers from '../controllers/vehiclesControllers';

class VehiclesRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        // API
        this.router.get('/api/vehicles', vehicleControllers.get);
        this.router.get('/api/vehicles:plate', vehicleControllers.getBy);
        this.router.post('/api/vehicles', vehicleControllers.post);
        this.router.put('/api/vehicles:plate', vehicleControllers.put);
        this.router.delete('/api/vehicles:plate', vehicleControllers.delete);

        // Views
        this.router.get('/vehicles', vehicleControllers.index);
        this.router.get('/vehicles/Create', vehicleControllers.create);
    }
}

const vehiclesRoutes = new VehiclesRoutes();
vehiclesRoutes.routes();

export default vehiclesRoutes.router;