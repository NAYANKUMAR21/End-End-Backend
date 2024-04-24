const { createClient } = require("redis");

// Default connection (localhost, port 6379)
const redisClient = createClient();

// Optional: Connect to a different host/port or use a connection string
// redisClient.createClient({ url: 'redis://user:password@host:port' });

redisClient.on("error", (err) => console.error("Redis Client Error", err));

redisClient.on("connect", () => console.log("Connected to Redis!"));

// Your Redis operations here (e.g., SET, GET, etc.)
redisClient.on("disconnect", () => console.log("Disconnected the redis"));
// Remember to quit the client when you're done
// (optional, client automatically quits on process termination)
// redisClient.quit();

module.exports = redisClient;
