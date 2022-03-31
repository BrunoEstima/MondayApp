const util = require('util')

async function consoleLog(text) {
    console.log(util.inspect(text, {showHidden: false, depth: null, colors: true}));
}

async function consoleFunctionLog(functionName) {
    console.log("Starting function %s...", functionName);
}

module.exports = {
    consoleLog,
    consoleFunctionLog
};
  