const express = require('express');
const cors = require('cors')
var favicon = require('serve-favicon');
var path = require('path');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


const app = express();
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(cors());
app.use(express.static('public'));

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "HTTP Classic API",
            description: "API Information of http-classic-js",
            contact: {
                name: "user@example.com"
            },
            servers: ["http://localhost:3001"]
        }
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/user', require('./routes/user_routes.js'));

module.exports = app;