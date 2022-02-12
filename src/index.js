const express = require("express");
const cors = require("cors");
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./configs/swagger.json');
const dotenv = require('dotenv');

dotenv.config({path : 'src/.env'});

const port = process.env.PORT || 3000;

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => {
    console.log(`🚀 ~ Server started on port ~ ${port}`);
})