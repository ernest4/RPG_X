const DEBUG = process.env.DEBUG_LOG === "true" || process.env.NODE_ENV !== "production";

exports.log = console.log;

exports.debugLog = (msg) => {
  if (DEBUG) console.log(`[Pulse]: ${msg}`);
};
