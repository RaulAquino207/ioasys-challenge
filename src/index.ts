import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import routes from "./routes";
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as swaggerUi from "swagger-ui-express";
// import './database/database'

const swaggerconfig = require('../swaggerconfig.json');

dotenv.config({path : 'src/.env'});
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerconfig));


app.listen(port, () => {
    console.log(`🚀 ~ Server started on port ~ ${port}, go to http://localhost:${port}/api-docs for endpoint documentation.`);
})

