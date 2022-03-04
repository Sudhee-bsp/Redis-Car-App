import Redis from "ioredis";

import { searchCars } from "../../lib/redis";

// let redisClient = new Redis(process.env.REDIS_URL3);
const redisPort = process.env.REDIS_URL3;
const client = Redis.createClient(redisPort);

//log error to the console if any occurs connecting to client
client.on("error", (err) => {
  console.log(err);
});

export default async function handler(req, res) {
  // get the query request from user.
  const q = req.query.q;

  let result = {};
  let start = Date.now();

  try {
    client.get(q, async (err, cache) => {
      if (err) throw err;

      if (cache) {
        cache = JSON.parse(cache);
        console.log("Cache hit - loading from cache");
        console.log("Cache :" + cache);
        result.data = cache;
        result.type = "cache";
        result.latency = Date.now() - start;

        res.status(200).json(result);
      } else {
        console.log("Cache miss - loading from database");
        const cars = await searchCars(q);
        console.log("THIS IS MY CARS:", cars);
        result.data = cars;
        result.type = "database";
        result.latency = Date.now() - start;
        client.setex(q, 600, JSON.stringify(result.data));
        console.log("Result api file: " + result.data);
        res.status(200).json(result);
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }

  // ========================== NO CACHING ===================================
  // Without caching data - directly querying always from database
  // const q = req.query.q;

  // const cars = await searchCars(q);

  // res.status(200).json({ cars });
}
