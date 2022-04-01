const util = require('util');
const LOG_PREFIX_TEXT = "[APP] ";

const logText = (text) => console.log(LOG_PREFIX_TEXT + text);
const logObject = (object) => logText(util.inspect(object));
const logTextAndObject = (text, object) => logText(text + util.inspect(object));
 
module.exports =  {
    LOG_PREFIX_TEXT,
    logText,
    logObject,
    logTextAndObject
}