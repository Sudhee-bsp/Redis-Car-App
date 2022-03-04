import { createCar } from "../../lib/redis";

// default handler is the function that handles all the API routes.
export default async function handler(req, res) {
  // handling a car creation request from GUI.
  const id = await createCar(req.body);

  // send the response
  res.status(201).json(id);
}
