import { strequal } from "../str";

const isTruthy_ = (value) => {
  return value && !strequal(value, "0") && !strequal(value, "false");
};

export const createLoggerWithPrefix = ({ prefix }) => {
  return {
    log:
      isTruthy_(process.env.DEBUG) || isTruthy_(process.env[`DEBUG_${prefix}`])
        ? (...x) => console.log(`[${prefix}] `, ...x)
        : () => {},

    debug:
      isTruthy_(process.env.DEBUG) || isTruthy_(process.env[`DEBUG_${prefix}`])
        ? (...x) => console.log(`[${prefix}] `, ...x)
        : () => {},

    info:
      isTruthy_(process.env.DEBUG) || isTruthy_(process.env[`DEBUG_${prefix}`])
        ? (...x) => console.log(`[${prefix}] `, ...x)
        : () => {},
  };
};

export const createLoggerWithPrefix_ = (prefix) =>
  createLoggerWithPrefix({ prefix });
