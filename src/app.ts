import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { MongoClient } from "./database/mongo";
import { routes } from "./routes";

const main = async () => {
  config();
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use(routes)

  const PORT: string | number = process.env.PORT || 8000;

  await MongoClient.connect().then(() => app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  ));

};
main();
