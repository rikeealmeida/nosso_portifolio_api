import { MongoClient as Mongo, Db } from "mongodb";
export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const url = process.env.MONGO_URL || "localhost:27018";
    const username = process.env.MONGO_USERNAME;
    const password = process.env.MONGO_PASSWORD;

    try {
      const client = new Mongo(url, { auth: { username, password } });
      await client.connect();
      const db = client.db("portifolio-db");
      this.client = client;
      this.db = db;
      console.log("connected to mongodb!");
    } catch (error) {
      console.log("cant connect to mongodb!");
    }
  },
};
