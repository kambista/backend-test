import { Router } from 'express';
import indexControllers from '../controllers/indexControllers';

class IndexRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        // Views
        this.router.get('/', indexControllers.index);
    }
}

const indexRoutes = new IndexRoutes();
indexRoutes.routes();

export default indexRoutes.router;