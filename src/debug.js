const DEBUG = process.env.DEBUG_LOG || false;

export const log = console.log;

export const debugLog = (msg) => {
  if (DEBUG) console.log(msg);
};
