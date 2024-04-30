const { createClient } = require("redis");

const redisClient = createClient({ legacyMode: true });

redisClient.on("error", (err) => console.error("Redis Client Error", err));

redisClient.on("connect", () => console.log("Connected to Redis!"));

redisClient.on("disconnect", () => console.log("Disconnected the redis"));

module.exports = redisClient;
