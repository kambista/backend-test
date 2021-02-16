import { Router } from 'express';
import vehicleStaysControllers from '../controllers/vehicleStaysControllers';

class VehiclesStaysRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        // API
        this.router.get('/api/vehiclesStays', vehicleStaysControllers.get);
        this.router.get('/api/vehiclesStays:id', vehicleStaysControllers.getBy);
        this.router.post('/api/vehiclesStays', vehicleStaysControllers.post);
        this.router.put('/api/vehiclesStays:id', vehicleStaysControllers.put);
        this.router.delete('/api/vehiclesStays:id', vehicleStaysControllers.delete);
    }
}

const vehiclesStaysRoutes = new VehiclesStaysRoutes();
vehiclesStaysRoutes.routes();

export default vehiclesStaysRoutes.router;