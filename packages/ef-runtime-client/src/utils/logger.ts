export const logger = {
  error: (...args: unknown[]) => {
    const [message, ...extra] = args;
    process.env.NODE_ENV !== "test" &&
      console.error(
        typeof message === "string"
          ? `Extensible Front-End: ${message}`
          : message,
        ...extra
      );
  },
  warn: (...args: unknown[]) => {
    const [message, ...extra] = args;
    process.env.NODE_ENV !== "test" &&
      console.warn(
        typeof message === "string"
          ? `Extensible Front-End: ${message}`
          : message,
        ...extra
      );
  },
  info: (...args: unknown[]) => {
    const [message, ...extra] = args;
    process.env.NODE_ENV !== "test" &&
      console.info(
        typeof message === "string"
          ? `Extensible Front-End: ${message}`
          : message,
        ...extra
      );
  },
};
