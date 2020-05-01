const DEBUG = process.env.DEBUG_LOG === "true" || process.env.NODE_ENV !== "production";

export const log = console.log;

export const debugLog = (msg) => {
  if (DEBUG) console.log(msg);
};
