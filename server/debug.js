const DEBUG = process.env.DEBUG_LOG === "true" || process.env.NODE_ENV !== "production";

exports.log = (msg) => console.log(`[Server]: ${msg}`);

exports.debugLog = (msg) => {
  if (DEBUG) console.log(`[Server]: ${msg}`);
};
