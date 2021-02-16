import { Request, Response } from 'express';

class IndexControllers {
    constructor() {
    }

    public index(request: Request, response: Response) {
        response.render('dashboard/index', { title: 'Dashboard'});
    }
}

const indexControllers = new IndexControllers();

export default indexControllers;