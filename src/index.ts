import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import routes from "./routes";
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import * as swaggerUi from "swagger-ui-express";
import { Role } from "./entity/Role.entity";

const swaggerconfig = require('../swaggerconfig.json');

dotenv.config({path : 'src/.env'});
const port = process.env.PORT || 3000;

const app = express();
createConnection().then(async connection => {
    const roles = [
        new Role({
            roleName: "Admin",
            roleTag : "ADMIN"
        }),
        new Role({
            roleName: "Employee",
            roleTag : "EMPLOYEE"
        })
    ];

    const roleRepository = connection.getRepository(Role);
    
    const foundRoles = await roleRepository.find();
    if(foundRoles.length == 0){
        roleRepository.save(roles);
    }
})

app.use(bodyParser.json());
app.use(cors());
app.use(routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerconfig));
app.listen(port, () => {
    console.log(`🚀 ~ Server started on port ~ ${port}`);
})

