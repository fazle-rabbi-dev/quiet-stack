// Simple logger - use instead of console.log per project rules
export const logger = {
  log: (...args: unknown[]) => {
    if (process.env.NODE_ENV !== "production") console.log(...args)
  },
  info: (...args: unknown[]) => {
    if (process.env.NODE_ENV !== "production") console.info(...args)
  },
  warn: (...args: unknown[]) => console.warn(...args),
  error: (...args: unknown[]) => console.error(...args),
}
