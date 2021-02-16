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
        this.router.post('/api/vehiclesStays/startMonth', vehicleStaysControllers.startMonth);
        this.router.post('/api/vehiclesStays/paymentsPending', vehicleStaysControllers.paymentsPending);
        this.router.post('/api/vehiclesStays/discharge', vehicleStaysControllers.discharge);
        this.router.put('/api/vehiclesStays:id', vehicleStaysControllers.put);
        this.router.delete('/api/vehiclesStays:id', vehicleStaysControllers.delete);

        // Views
        this.router.get('/vehiclesStays', vehicleStaysControllers.index);
        this.router.get('/vehiclesStays/Create', vehicleStaysControllers.create);
    }
}

const vehiclesStaysRoutes = new VehiclesStaysRoutes();
vehiclesStaysRoutes.routes();

export default vehiclesStaysRoutes.router;