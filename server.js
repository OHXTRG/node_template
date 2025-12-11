import http from "http";
import app from "./app.js";
import dotenv from "dotenv";
import path from "path";
import { connectMongo } from "./db/db.js";
dotenv.config({
  path: path.resolve(import.meta.dirname, `.env.${process.env.NODE_ENV}`),
});

const server = http.createServer(app);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectMongo(process.env.MONGO_URL);
    console.log("mongodb is connected");
    server.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.log("error while running server ", error);
  }
};

start();
