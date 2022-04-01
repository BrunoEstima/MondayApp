// Load .env variables into the process.env
require('dotenv').config();

const express = require('express');
const ngrok = require('ngrok');

const logging = require('./src/Utils/logging');
const router = require('./src/Routes/routes')

const { env } = process;

// Create an Express application
const app = express();

// Use routes.js to manage routes
app.use(router);

// Start listening
app.listen(env.PORT, env.HOST, async () => {
    logging.logText(`Starting local webserver in http://${env.HOST}:${env.PORT}`);
    // const url = await ngrok.connect(env.PORT);
    // logging.logText(`Starting Ngrok webserver in ${url}`);

});
