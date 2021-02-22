import * as dotenv from "dotenv";
import {createConnection} from "typeorm";
import {app} from "./app";

dotenv.config();
createConnection().then(async connection => {
    if (!process.env.PORT) {
        process.exit(1);
    }
    const PORT: number = parseInt(process.env.PORT as string, 10);
    
    app.listen(PORT);
    console.log(`Express application is up and running on port ${PORT}`);

}).catch(error => console.log("TypeORM connection error: ", error));