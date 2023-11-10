import express, { Request, Response } from "express";
import { Pool, Client } from "pg";

// express app
const app = express();
app.use(express.json());

const startApi = async () => {
  const client = new Client({
    user: "postgres",
    host: "localhost",
    password: "postgres",
    port: 5432,
  });
  client.connect(async (err) => {
    if (err) {
      console.error("connection error", err.stack);
    } else {
      // connected now do stuff
      console.error("connected");
    }
  });
};

startApi();
