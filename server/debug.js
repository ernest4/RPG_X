const DEBUG = process.env.DEBUG_LOG || false;

exports.log = console.log;

exports.debugLog = (msg) => {
  if (DEBUG) console.log(`[Pulse]: ${msg}`);
};
