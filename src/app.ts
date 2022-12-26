import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import menuRoutes from "./routes";

const app = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(menuRoutes);

const uri: string =
    `mongodb://rick:533456@localhost:27018/?authMechanism=DEFAULT`
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