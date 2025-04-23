import { Effect } from "effect";
import { Config } from "./config.js";
import TelegramBot from "node-telegram-bot-api";
export const notify = (message) => {
    return Effect.gen(function* () {
        const config = yield* Config;
        if (!config.config.telegram_bot_token || !config.config.telegram_chat_id) {
            yield* Effect.logInfo("Telegram bot token or chat ID not set. Skipping notification.");
            return;
        }
        const bot = new TelegramBot(config.config.telegram_bot_token);
        yield* Effect.tryPromise({
            try: () => bot.sendMessage(config.config.telegram_chat_id, message),
            catch: (error) => {
                console.error("Error sending message:", error);
                return null;
            }
        });
        yield* Effect.logInfo(message);
    });
};
