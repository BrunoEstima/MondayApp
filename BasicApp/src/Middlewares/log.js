const logging = require('./../Utils/logging');

const logRoute = (req, res, next) => {
    const { method, url, body, query } = req;

    logging.logTextAndObject(`New Request => method: ${method}, url: "${url}", body: `, body);
    next();
}

module.exports = {
    logRoute
}