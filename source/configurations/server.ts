import express from 'express';
import expressHandlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

import indexRoutes from '../routes/indexRoutes';
import vehiclesRoutes from '../routes/vehiclesRoutes';
import vehiclesStaysRoutes from '../routes/vehiclesStaysRoutes';

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.configurator();
        this.routes();
    }

    configurator() {
        // Database
        const mongouri = 'mongodb+srv://root:1234@kambista.nrrcw.mongodb.net/<dbname>?retryWrites=true&w=majority';
        mongoose.set('useFindAndModify', true);
        mongoose.connect(mongouri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }).then(database => {
            console.log('Database is connected');
        });

        // Settings
        this.app.set('port', process.env.PORT || 30000);
        this.app.set('views', path.join(__dirname, '../views/'));
        
        this.app.engine('.hbs', expressHandlebars({
            extname: '.hbs',
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            helpers: path.join(__dirname, '../helpers/index'),
            defaultLayout: 'main'
        }));
        this.app.set('view engine', '.hbs');

        // Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
    }

    routes() {
        // Routes
        this.app.use(indexRoutes);
        this.app.use(vehiclesRoutes);
        this.app.use(vehiclesStaysRoutes);
    }

    start() {
        // Listen
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();