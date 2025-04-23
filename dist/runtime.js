import { Layer, Logger, LogLevel, ManagedRuntime } from "effect";
import { ConfigLayer } from "./config.js";
const logger = Logger.make(({ logLevel, message }) => {
    globalThis.console.log(`[${logLevel.label}] ${message}`);
});
const combined = Logger.zip(Logger.defaultLogger, logger);
export const build_runtime = (args) => {
    const log_level = process.env.DEBUG === "true" ? LogLevel.Debug : LogLevel.Info;
    return ManagedRuntime.make(Layer.mergeAll(ConfigLayer(args), Logger.minimumLogLevel(log_level), Logger.replace(Logger.defaultLogger, Logger.prettyLogger({
        colors: true,
        mode: 'tty'
    }))));
};
