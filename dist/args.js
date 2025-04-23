import yargs from "yargs";
export async function get_args() {
    // Use hideBin to properly handle process.argv
    const argv = await yargs(process.argv.slice(2))
        // Add a more descriptive help message here
        .usage('Usage: $0 [options]\n\nRuns the Docker Swarm Autoscaler application.')
        // Define the '-s' option (example, adjust as needed)
        .option('s', {
        alias: 'scaler', // Example alias
        type: 'boolean', // Explicitly set type
        describe: 'Enable/disable the main autoscaler functionality (currently unused in this example)', // More descriptive text
        // default: true, // Setting a default might not be needed if it's just a flag
    })
        .default('s', true) // Default to false if not provided
        // Add other options as needed based on your environment variables/labels
        // Example: .option('interval', { type: 'number', default: 60, describe: 'Polling interval in seconds' })
        .help() // Enable the default --help option
        .alias('h', 'help') // Alias -h for --help
        .strict() // Report errors for unknown options
        .wrap(yargs().terminalWidth()) // Wrap help text to terminal width
        // Add information about environment variables in the epilogue
        .epilogue(`
Environment Variables:
    DEBUG                   Set to "true" for debug logging (Default: false)
    PROM_HOST               Prometheus host (e.g., prometheus.example.com)
    PROM_PORT               Prometheus port (e.g., 9090, 443)
    PROM_SCHEMA             Prometheus schema (http or https)
    PROM_USER               (Optional) Prometheus basic auth username
    PROM_PASS               (Optional) Prometheus basic auth password
    TELEGRAM_BOT_TOKEN    (Optional) Telegram Bot API token for notifications
    TELEGRAM_CHAT_ID      (Optional) Telegram Chat ID for notifications
    AUTOSCALER_INTERVAL     Polling interval in seconds (Default: 60)
    BATCH_SIZE              Number of services to process in parallel (Default: 5)

Service Label Configuration (defaults shown):
    ${process.env.ENABLE_AUTOSCALER_LABEL || 'swarm.autoscaler'}: "true" (Enable autoscaling for the service)
    ${process.env.AUTOSCALER_MIN_REPLICAS_LABEL || 'swarm.autoscaler.min_replicas'}: ${process.env.AUTOSCALER_MIN_REPLICAS_DEFAULT || 1} (Minimum replicas)
    ${process.env.AUTOSCALER_MAX_REPLICAS_LABEL || 'swarm.autoscaler.max_replicas'}: ${process.env.AUTOSCALER_MAX_REPLICAS_DEFAULT || 10} (Maximum replicas)
    ${process.env.AUTOSCALER_MINIMUM_CPU_LABEL || 'swarm.autoscaler.minimum_cpu'}: ${process.env.AUTOSCALER_CPU_MINIMUM_DEFAULT || 25} (% CPU below which to scale down)
    ${process.env.AUTOSCALER_MAXIMUM_CPU_LABEL || 'swarm.autoscaler.maximum_cpu'}: ${process.env.AUTOSCALER_MAXIMUM_CPU_DEFAULT || 85} (% CPU above which to scale up)
    ${process.env.AUTOSCALER_MINIMUM_MEM_LABEL || 'swarm.autoscaler.minimum_mem'}: ${process.env.AUTOSCALER_MEM_MINIMUM_DEFAULT || 25} (% Memory below which to scale down)
    ${process.env.AUTOSCALER_MAXIMUM_MEM_LABEL || 'swarm.autoscaler.maximum_mem'}: ${process.env.AUTOSCALER_MAXIMUM_MEM_DEFAULT || 85} (% Memory above which to scale up)
    `)
        .parseAsync(); // Use parseAsync for async handling
    // Cast to the defined interface for better type safety
    return argv;
}
