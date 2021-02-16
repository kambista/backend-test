"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const handlebars_1 = __importDefault(require("handlebars"));
const allow_prototype_access_1 = require("@handlebars/allow-prototype-access");
const indexRoutes_1 = __importDefault(require("../routes/indexRoutes"));
const vehiclesRoutes_1 = __importDefault(require("../routes/vehiclesRoutes"));
const vehiclesStaysRoutes_1 = __importDefault(require("../routes/vehiclesStaysRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.configurator();
        this.routes();
    }
    configurator() {
        // Database
        const mongouri = 'mongodb+srv://root:1234@kambista.nrrcw.mongodb.net/<dbname>?retryWrites=true&w=majority';
        mongoose_1.default.set('useFindAndModify', true);
        mongoose_1.default.connect(mongouri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }).then(database => {
            console.log('Database is connected');
        });
        // Settings
        this.app.set('port', process.env.PORT || 30000);
        this.app.set('views', path_1.default.join(__dirname, '../views/'));
        this.app.engine('.hbs', express_handlebars_1.default({
            extname: '.hbs',
            layoutsDir: path_1.default.join(this.app.get('views'), 'layouts'),
            partialsDir: path_1.default.join(this.app.get('views'), 'partials'),
            helpers: path_1.default.join(__dirname, '../helpers/index'),
            defaultLayout: 'main',
            handlebars: allow_prototype_access_1.allowInsecurePrototypeAccess(handlebars_1.default)
        }));
        this.app.set('view engine', '.hbs');
        // Middlewares
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(cors_1.default());
    }
    routes() {
        // Routes
        this.app.use(indexRoutes_1.default);
        this.app.use(vehiclesRoutes_1.default);
        this.app.use(vehiclesStaysRoutes_1.default);
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
