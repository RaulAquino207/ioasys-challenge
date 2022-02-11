const express = require("express");
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('swagger-json');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => {
    console.log(`🚀 ~ Server started on port ~ ${port}`);
})