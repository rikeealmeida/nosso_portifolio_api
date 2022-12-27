import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import menuRoutes from "./routes";
import { config } from "dotenv";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { GetUsersController } from "./controllers/get-users/get-users";

config();

const app = express();

const PORT: string | number = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(menuRoutes);

const uri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}:${process.env.MONGO_PORT}/?authMechanism=DEFAULT`;
app.get("/users", async (req, res) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository();
  const getUsersController = new GetUsersController(mongoGetUsersRepository);
  const { body, statusCode } = await getUsersController.handle();

  res.send(body).status(statusCode);
});

mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error;
  });
