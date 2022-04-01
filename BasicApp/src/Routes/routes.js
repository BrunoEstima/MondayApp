const express = require('express');
const bodyParser = require('body-parser');
const logMiddleware = require('./../Middlewares/log');

// Starting express router
const router = express.Router();

// Add the body parser for the requests
router.use(bodyParser.json());

// Add the log middleware to print requests
router.use(logMiddleware.logRoute);

// Return the response with some dummy text
router.use((req, res, next) => res.send('Hello!'));

module.exports = router;