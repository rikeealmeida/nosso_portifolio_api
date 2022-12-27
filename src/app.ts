import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import menuRoutes from "./routes";
import { config } from "dotenv";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoClient } from "./database/mongo";

// app.use(menuRoutes);

const main = async () => {
  config();
  const app = express();

  app.use(cors());

  app.use(express.json());

  await MongoClient.connect();

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);
    const { body, statusCode } = await getUsersController.handle();

    res.send(body).status(statusCode);
  });

  const PORT: string | number = process.env.PORT || 8000;

  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
};
main();
// const uri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/?authMechanism=DEFAULT`;

// mongoose
//   .connect(uri)
//   .then(() =>
//     app.listen(PORT, () =>
//       console.log(`Server running on http://localhost:${PORT}`)
//     )
//   )
//   .catch((error) => {
//     throw error;
//   });
