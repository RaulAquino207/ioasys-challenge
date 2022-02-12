const express = require('express');

const routes = express.Router();

routes.get("/health", (req, res) => {
    return res.json({
        status : "SUCCESS"
    })
})

module.exports = routes;