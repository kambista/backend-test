"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexControllers {
    constructor() {
    }
    index(request, response) {
        response.render('dashboard/index', { title: 'Dashboard' });
    }
}
const indexControllers = new IndexControllers();
exports.default = indexControllers;
