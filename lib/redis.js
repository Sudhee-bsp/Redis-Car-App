import { Client, Entity, Schema, Repository } from "redis-om";

// Client is the main entry point to connect to DB.
const client = new Client();

// as it is NextJs, we shall use async func to connect db only if it is not opened.
async function connect() {
  if (!client.isOpen()) {
    await client.open(process.env.REDIS_URL3);
  }
}

// Entity is like DATABASE TABLE - we have to create a class extending it.
// Then a data model - schema can be created - what properties to have (along with their datatypes).
class Car extends Entity {}

let schema = new Schema(
  Car,
  {
    make: { type: "string" },
    model: { type: "string", required: true },
    image: { type: "string" },
    description: { type: "string", textSearch: true },
  },
  {
    dataStructure: "JSON",
  }
  // specify the data structure makes sure that the data is stored in JSON for operations.
);

// ----------------------------------------
// Now create the data:-

export async function createCar(data) {
  // first, connect to db
  await connect();

  // create a reposiory = schema + client
  const repository = new Repository(schema, client);

  // now create the data
  const car = repository.createEntity(data);

  // next, save the repository - to commit to the database
  const id = await repository.save(car);

  return id;
}

// ----------------------------------------
// Creating a Index - For RedisSearch - allows you to faster query

export async function createIndex() {
  await connect();

  const repository = new Repository(schema, client);

  await repository.createIndex();
}

// ----------------------------------------
// For handling the queries
export async function searchCars(query) {
  await connect();

  const repository = new Repository(schema, client);

  const cars = await repository
    .search()
    // exact equal make
    .where("make")
    .eq(query)
    // exact equal model
    .or("model")
    .eq(query)
    // search matches in description
    .or("description")
    .matches(query)
    // finally, return all above results for query
    .return.all();

  return cars;
}
